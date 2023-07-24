const userModel = require("../models/userModel");
const cron = require("node-cron");

// Schedule the job to run every day at midnight (change the schedule as needed)
cron.schedule("0 0 * * *", async () => {
    try {
        // Find all documents where the subscription date is not null
        const usersWithSubscriptions = await userModel.find({
            "subscription.date": { $ne: null },
        });

        // Update each user's subscription field with default values if the date has passed
        for (const user of usersWithSubscriptions) {
            if (user.subscription.date < new Date()) {
                user.subscription = {
                    id: "none",
                    status: "inactive",
                    type: "none",
                    state: "none",
                    date: null,
                };
                await user.save();
            }
        }

        console.log("Subscription update job completed successfully.");
    } catch (err) {
        console.error("Error updating subscriptions:", err);
    }
});

