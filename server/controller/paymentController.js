const Razorpay = require('razorpay');
require('dotenv').config();
const crypto = require("crypto");
const userModel = require("../models/userModel");
const paymentModel = require("../models/paymentModel");

module.exports.buySubscription = async (req, res) => {

    const plan = req.body.plan;

    const id = req.body.id;
    const KEY = process.env.RAZORPAY_KEY_ID;
    const SECRET = process.env.RAZORPAY_SECRET_ID;
    const OneStatePlan = process.env.ONE_STATE_PLAN;
    const AllIndiaPlan = process.env.ALL_INDIA_PLAN;
    const GlobalPlan = process.env.GLOBAL_PLAN;

    const user = await userModel.findById(id);
    if (user.userRole === "admin")
        return res.status(201).json({
            success: false,
        })

    let PLAN;
    if (plan == "OneStatePlan") PLAN = OneStatePlan;
    else if (plan == "AllIndiaPlan") PLAN = AllIndiaPlan;
    else if (plan == "GlobalPlan") PLAN = GlobalPlan;
    else return false

    var instance = new Razorpay({ key_id: KEY, key_secret: SECRET })
    let subscription;

    try {
        subscription = await instance.subscriptions.create({
            plan_id: PLAN,
            customer_notify: 1,
            total_count: 1,
        });
    } catch (err) {
        console.log(err);
    }

    const updatedUser = await userModel.findOneAndUpdate(
        { _id: user._id },
        {
            $set: {
                'subscription.id': subscription.id,
                'subscription.status': subscription.status,
            },
        },
        { new: true }
    );

    return res.status(201).json({
        success: true,
        subscription
    })
}

module.exports.verify = async (req, res, next) => {
    const { razorpay_signature, razorpay_payment_id, razorpay_subscription_id, userId } = req.body;

    const user = await userModel.findById(userId);

    const subscription_id = user.subscription.id;

    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_ID)
        .update(razorpay_payment_id + "|" + subscription_id, "utf-8")
        .digest('hex');

    const isAuthentic = generated_signature === razorpay_signature;

    if (!isAuthentic) return res.status(201).json({
        success: false,
        subscriptionStatus: user.subscription.status
    })

    await paymentModel.create({
        razorpay_signature,
        razorpay_payment_id,
        razorpay_subscription_id,
        userId
    });

    user.subscription.status = "active";

    await user.save();

    return res.status(201).json({
        success: true,
        subscriptionStatus: user.subscription.status,
    })
}

module.exports.getrazorpaykey = async (req, res, next) => {
    res.status(200).json({
        success: true,
        key: process.env.RAZORPAY_KEY_ID
    });
}

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_ID,
});

module.exports.createOrder = async (req, res) => {
    try {
        const { amount, receipt } = req.body;
        console.log(amount);
        const options = {
            amount: Number(amount * 100),
            currency: 'INR',
            receipt: receipt,
            payment_capture: 1,
        };

        const order = await razorpay.orders.create(options);

        res.json({
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
}

module.exports.verifyOrder = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, subscription } = req.body;
    console.log("at verify ", subscription);

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_ID)
        .update(body.toString())
        .digest('hex');

    const isAuthentic = generated_signature === razorpay_signature;
    if (isAuthentic) {

        console.log("Payment verified")

        if(subscription){
            try {
    
                const { planType, state, userId } = req.body;
                // Find the user by userId
                const user = await userModel.findById(userId);
    
                if (!user) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'User not found.',
                    });
                }
    
                // Get the current date
                const currentDate = new Date();
    
                // Add 30 days to the current date
                currentDate.setDate(currentDate.getDate() + 30);
    
                // Update the subscription status and plan type
                user.subscription.status = "active";
                user.subscription.type = planType;
                user.subscription.date = currentDate;
                if (state) {
                    user.subscription.state = state;
                }
                else {
                    user.subscription.state = "none";
                }
    
                await user.save();
    
                res.status(200).json({
                    success: true,
                    message: 'Subscription activated successfully.',
                });
            } catch (err) {
                console.log(err);
                res.status(500).json({
                    status: 'error',
                    message: 'Internal server error',
                });
            }
        }

        return res.status(201).json({
            success: true
        })

    }
    else return res.status(400).json({
        success: false
    })
}