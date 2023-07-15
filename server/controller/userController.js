
const AuctionMaterialForm = require("../models/services/AuctionMaterials/auctionmaterials");
const EmployerForm = require("../models/services/CareerManPower/employerModel");
const SeekerForm = require("../models/services/CareerManPower/seekerModel");
const CompanyForm = require("../models/services/Registration&Certification/companyCertificationModel");
const IndividualForm = require("../models/services/Registration&Certification/indivisualCertificationModel");
const RegistrationForm = require("../models/services/Registration&Certification/registrationModel");
const userModel = require("../models/userModel");
const jointventureForm = require("../models/services/JointVenture/jointventure");
const TenderOnlineModel = require("../models/services/Tenders/onlineFormModel");
const gemregistrationForm = require("../models/services/GemRegistration/gemregistration");
const TenderOfflineForm = require("../models/services/Tenders/offlineFormModel");

class User {

    async getSingleUser(req, res) {
        let { userId } = req.params;

        if (!userId) {
            return res.json({ error: "All filled must be required" });
        } else {
            try {
                let User = await userModel
                    .find({ userId: userId });
                if (User) {
                    return res.json({ User });
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    async getAllUser(req, res) {
        try {
            const { count, subscription } = req.body;
            let query = {};

            if (subscription) {
                query['subscription.status'] = subscription;
            }

            if (count === true) {
                const userCount = await userModel.countDocuments(query);
                return res.json({ count: userCount });
            } else {
                const users = await userModel.find(query);
                res.json(users);
            }
        } catch (error) {
            console.error('Error retrieving users:', error);
            res.status(500).json({ error: 'An error occurred while retrieving users' });
        }
    }

    async updateUserRole(req, res) {
        try {

            let { userId, userRole } = req.body;

            const user = await userModel.findOneAndUpdate(
                { userId: userId },
                { userRole: userRole },
                { new: true }
            );

            if (user) {
                return res.json({ success: "User role updated successfully" });
            } else {
                return res.json({ error: "User not found" });
            }
        } catch (error) {
            console.error('Error updating user role:', error);
            return { error: 'An error occurred while updating user role' };
        }
    };

    async deleteUser(req, res) {

        const userId = req.params.userId;

        try {
            const deletedUser = await userModel.findOneAndDelete({ userId });

            if (deletedUser) {
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            res.sendStatus(500);
        }
    }

    async newUsers(req, res) {
        const weeks = parseInt(req.params.weeks);

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - weeks * 7);

        try {
            const users = await userModel.find({
                createdAt: { $gte: startDate },
            });

            res.json(users);
        } catch (error) {
            res.sendStatus(500);
        }
    }

    async statistics(req, res) {
        try {
            const totalCount = await userModel.countDocuments();
            const adminCount = await userModel.countDocuments({ userRole: 'admin' });
            const employeeCount = await userModel.countDocuments({ userRole: 'employee' });
            const hrCount = await userModel.countDocuments({ userRole: 'hr' });
            const userCount = await userModel.countDocuments({ userRole: 'user' });
            const activeSubscriptionCount = await userModel.countDocuments({ 'subscription.status': 'active' });
            const inactiveSubscriptionCount = await userModel.countDocuments({ 'subscription.status': 'inactive' });

            res.json({
                totalCount,
                adminCount,
                employeeCount,
                hrCount,
                userCount,
                activeSubscriptionCount,
                inactiveSubscriptionCount
            });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching user statistics.', error });
        }
    }

    async ByUserRole(req, res) {
        try {
            const { userRole } = req.params;
            const users = await userModel.find({ userRole });
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
        }
    }

    async DetailsById(req, res) {
        const userId = req.params.id;
        const allForms = [];
        try {
            const auctionMaterialFormCount = await AuctionMaterialForm.countDocuments({ userId: userId });
            const auctionMaterialFormLatest = await AuctionMaterialForm.findOne({ userId: userId }).sort({ createdAt: -1 });
            delete auctionMaterialFormLatest?._id
            allForms.push({ formName: 'Auction Material', number: auctionMaterialFormCount, latestForm: auctionMaterialFormLatest });

            const companyFormCount = await CompanyForm.countDocuments({ userId: userId });
            const companyFormLatest = await CompanyForm.findOne({ userId: userId }).sort({ createdAt: -1 });
            delete companyFormLatest?._id
            allForms.push({ formName: 'Company', number: companyFormCount, latestForm: companyFormLatest });

            const employerFormCount = await EmployerForm.countDocuments({ userId: userId });
            const employerFormLatest = await EmployerForm.findOne({ userId: userId }).sort({ createdAt: -1 });
            delete employerFormLatest?._id;
            allForms.push({ formName: 'employer', number: employerFormCount, latestForm: employerFormLatest });

            const seekerFormCount = await SeekerForm.countDocuments({ userId: userId });
            const seekerFormLatest = await SeekerForm.findOne({ userId: userId }).sort({ createdAt: -1 });
            delete seekerFormLatest?._id;
            allForms.push({ formName: 'seeker', number: seekerFormCount, latestForm: seekerFormLatest });

            const iCertificationFormCount = await IndividualForm.countDocuments({ userId: userId });
            const iCertificationFormLatest = await IndividualForm.findOne({ userId: userId }).sort({ createdAt: -1 });
            delete iCertificationFormLatest?._id;
            allForms.push({ formName: 'Individual Certification', number: iCertificationFormCount, latestForm: iCertificationFormLatest });

            const companyCertificationFormCount = await CompanyForm.countDocuments({ userId: userId });
            const companyCertificationFormLatest = await CompanyForm.findOne({ userId: userId }).sort({ createdAt: -1 });
            delete companyCertificationFormLatest?._id;
            console.log(companyCertificationFormLatest);
            allForms.push({ formName: 'Company Certification', number: companyCertificationFormCount, latestForm: companyCertificationFormLatest });

            const registrationFormCount = await RegistrationForm.countDocuments({ userId: userId });
            const registrationFormLatest = await RegistrationForm.findOne({ userId: userId }).sort({ createdAt: -1 });
            delete registrationFormLatest?._id;

            allForms.push({ formName: 'registration', number: registrationFormCount, latestForm: registrationFormLatest });

            const jointVentureFormCount = await jointventureForm.countDocuments({ userId: userId });
            const jointVentureFormLatest = await jointventureForm.findOne({ userId: userId }).sort({ createdAt: -1 });
            delete jointVentureFormLatest?._id;
            allForms.push({ formName: 'joint venture', number: jointVentureFormCount, latestForm: jointVentureFormLatest });

            const tenderOfflineFormCount = await TenderOfflineForm.countDocuments({ userId: userId });
            const tenderOfflineFormLatest = await TenderOfflineForm.findOne({ userId: userId }).sort({ createdAt: -1 });
            delete tenderOfflineFormLatest?._id;
            allForms.push({ formName: 'Tender Offline', number: tenderOfflineFormCount, latestForm: tenderOfflineFormLatest });

            const tenderOnlineFormCount = await TenderOnlineModel.countDocuments({ userId: userId });
            const tenderOnlineFormLatest = await TenderOnlineModel.findOne({ userId: userId }).sort({ createdAt: -1 });
            delete tenderOnlineFormLatest?._id;
            allForms.push({ formName: 'Tender Online', number: tenderOnlineFormCount, latestForm: tenderOnlineFormLatest });

            const gemRegistrationFormCount = await gemregistrationForm.countDocuments({ userId: userId });
            const gemRegistrationFormLatest = await gemregistrationForm.findOne({ userId: userId }).sort({ createdAt: -1 });
            delete gemRegistrationFormLatest?._id;
            allForms.push({ formName: 'Gem Registration', number: gemRegistrationFormCount, latestForm: gemRegistrationFormLatest });

            console.log(allForms);
            res.json(allForms);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
        }
    }




}

const usersController = new User();
module.exports = usersController;
