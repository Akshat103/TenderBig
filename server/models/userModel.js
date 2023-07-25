const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            index: { unique: true }
        },
        name: {
            type: String,
            required: [true, "Please enter your name."],
            maxlength: 32,
        },
        email: {
            type: String,
            required: [true, "Please enter your email."],
            index: { unique: true },
            validate: validator.isEmail
        },
        password: {
            type: String,
            required: [true, "Please enter your password."],
            minlength: [8, "Password must be at least 8 characters"],
        },
        userRole: {
            type: String,
            enum: ["admin", "employee", "hr", "user", "franchise"],
            default: "user"
        },
        phoneNumber: {
            type: Number,
            required: true,
        },
        subscription: {
            status: {
                type: String,
                default: "inactive",
            },
            type: {
                type: String,
                enum: ["One State Plan", "All India", "Global", "none"],
                default: "none",
            },
            state: {
                type: String,
                default: "none",
            },
            date: {
                type: Date,
                default: null,
            },
        },
        country: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        ResetPasswordToken: String,
        ResetPasswordEcpire: String
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
            },
        },
    },
    { timestamps: true }
);

// Middleware to update subscription and date fields when user role is changed
const updateSubscriptionAndDate = function (next) {
    const updatedFields = this.getUpdate();
  
    // Check if the user role is being updated
    if (updatedFields.userRole) {
      if (['admin', 'employee', 'hr', 'franchise'].includes(updatedFields.userRole)) {
        const currentDate = new Date();
        updatedFields['subscription.status'] = 'active';
        updatedFields['subscription.type'] = 'Global';
        updatedFields['subscription.date'] = new Date(currentDate.getFullYear() + 10, currentDate.getMonth(), currentDate.getDate());
      }
    }
  
    next();
  };
  
  // Pre-save middleware to set subscription and date fields for new users
  userSchema.pre('save', function (next) {
    if (['admin', 'employee', 'hr', 'franchise'].includes(this.userRole)) {
      const currentDate = new Date();
      this.subscription.status = 'active';
      this.subscription.type = 'Global';
      this.subscription.date = new Date(currentDate.getFullYear() + 10, currentDate.getMonth(), currentDate.getDate());
    }
    next();
  });
  
  // Pre-update middleware for findOneAndUpdate operation
  userSchema.pre('findOneAndUpdate', updateSubscriptionAndDate);
  
  // Pre-update middleware for updateOne operation
  userSchema.pre('updateOne', updateSubscriptionAndDate);

const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;