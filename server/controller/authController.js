const userModel = require("../models/userModel");
const { toTitleCase, validateEmail, generateUUID } = require("../config/functions");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const sendEmail = require('../utils/email');
require('dotenv').config();

class Auth {

  /* User Registration/Signup controller  */
  async postSignup(req, res) {
    let { name, email, password, phoneNumber, userRole, country, state, city } = req.body;
    let error = {};
    if (
      !name ||
      !email ||
      !password ||
      !phoneNumber ||
      !country
    ) {
      error = {
        ...error,
        name: "Filed must not be empty",
        email: "Filed must not be empty",
        password: "Filed must not be empty",
        phoneNumber: "Filed must not be empty",
        country: "Filed must not be empty",
      };
      return res.json({ error });
    }
    if (name.length < 3 || name.length > 25) {
      error = { ...error, name: "Name must be 3-25 charecter" };
      return res.json({ error });
    } else {
      if (validateEmail(email)) {
        name = toTitleCase(name);
        if ((password.length > 255) | (password.length < 8)) {
          error = {
            ...error,
            password: "Password must be 8 charecter",
            name: "",
            email: "",
          };
          return res.json({ error });
        } else {
          // If Email & Number exists in Database then:
          try {
            password = bcrypt.hashSync(password, 10);
            let data = await userModel.findOne({ email: email });
            if (data) {
              error = {
                ...error,
                password: "",
                name: "",
                email: "Email already exists",
              };
              return res.json({ error });
            }
            data = await userModel.findOne({ phoneNumber: phoneNumber });
            if (data) {
              error = {
                ...error,
                password: "",
                name: "",
                email: "",
                phoneNumber: "Number already exists",
              };
              return res.json({ error });
            } else {
              const userId = generateUUID();

              let newUser = new userModel({
                userId,
                name,
                email,
                password,
                userRole,
                phoneNumber,
                country,
                state,
                city
              });
              newUser
                .save()
                .then((data) => {
                  return res.json({
                    success: "Account create successfully. Please login",
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        error = {
          ...error,
          password: "",
          name: "",
          email: "Email is not valid",
        };
        return res.json({ error });
      }
    }
  }

  /* User Login/Signin controller  */
  async postSignin(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        error: "Fields must not be empty",
      });
    }
    try {
      let data = await userModel.findOne({ email: email });
      if (data) {

      }
      const MAIL = process.env.DEFAULT_MAIL;
      const PASS = process.env.DEFAULT_PASS;
      if (MAIL == email && PASS == password) {
        const token = jwt.sign(
          { data: { userId: "admin", userRole: "admin", name: "maria_dev" } },
          JWT_SECRET
        );
        const encode = jwt.verify(token, JWT_SECRET);
        return res.json({
          token: token,
          user: encode,
        });
      }
      else {
        const data = await userModel.findOne({ email: email });
        if (!data) {
          return res.json({
            error: "Invalid email",
          });
        } else {
          const login = await bcrypt.compare(password, data.password);
          if (login) {
            const token = jwt.sign(
              { data },
              JWT_SECRET
            );
            const encode = jwt.verify(token, JWT_SECRET);
            return res.json({
              token: token,
              user: encode,
            });
          } else {
            return res.json({
              error: "Invalid password",
            });
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postLogout(req, res) {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  }

  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await userModel.findOne({ email: email });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "We could not find a user with the given email."
        });
      }

      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
      const resetPasswordExpire = Date.now() + 10 * 60 * 1000;

      // Store the reset token and expiration in the user model
      user.ResetPasswordToken = resetPasswordToken;
      user.ResetPasswordExpire = resetPasswordExpire;
      await user.save();

      const resetUrl = `${req.protocol}://${req.get('host')}/apiTender/reset-password/${resetToken}`;

      const message = `We have received a password reset request. Please use the below link to reset your password.\n\n${resetUrl}\n\nThis reset password link is valid only for 10 minutes.`;
      console.log(resetUrl)
      try {
        await sendEmail({
          email: user.email,
          subject: 'Password change request recieved.',
          message: message
        })

        res.status(200).json({
          success: true,
          message: "Reset password token has been sent to the user.",
        });

      }
      catch (error) {
        console.log(error)

        user.ResetPasswordToken = undefined;
        user.ResetPasswordExpire = undefined;
        await user.save();

        return res.status(404).json({
          success: false,
          message: "Their was an error sending password reset email. Please try again later.",
        });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "An error occurred while processing the request."
      });
    }
  }

  async resetPassword(req, res) {
    const resetToken = req.params.token;

    const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    try {
      const user = await userModel.findOne({ ResetPasswordToken: resetPasswordToken, ResetPasswordExpire: { $gt: Date.now() } });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Token is invalid or expired."
        });
      }

      const { password, conformPassword } = req.body;

      if(password === conformPassword){
        try{
          user.password = password;
          user.ResetPasswordToken = undefined;
          user.ResetPasswordExpire = undefined;
          user.PasswordChangedAt = Date.now();
          await user.save();
          return res.status(404).json({
            success: true,
            message: "Password changed successfully."
          });
        }
        catch(error){
          console.log(error);
          return res.status(404).json({
            success: false,
            message: "Password changed successfully."
          });
        }
      }
      else{
        return res.status(404).json({
          success: false,
          message: "Their was an error resetting password. Please try again."
        });
      }
    }
    catch (error) {
      console.log(error);
      return res.status(404).json({
        success: false,
        message: "We could not find a user."
      });
    }


  }
}

const authController = new Auth();
module.exports = authController;
