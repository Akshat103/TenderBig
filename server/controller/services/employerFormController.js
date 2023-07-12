const EmployerForm = require('../../models/services/CareerManPower/employerModel');
const { getFileByFilename, uploadFileToS3, getLink } = require('../../config/s3function')

const submitForm = async (req, res) => {
    try {
        const userId = req.userId;
        console.log(userId);
        const {

            company,
            mobile,
            email,
            cwork,
            jobpost,
            experience,
            salary,
            curl,
            GST,
            companyprofile,
            contactpnumber,
            regno,
            PAN,
            address,
            city,
            zipcode,
            state,
            country,
            officetiming,
            holidays,
            workingdays,
            seekerpost,
            resumeUrl,
            otherUrl
        } = req.body;

        // Create a new instance of the EmployerForm model
        const employer = new EmployerForm({
            userId,
            company,
            mobile,
            email,
            cwork,
            jobpost,
            experience,
            salary,
            curl,
            GST,
            companyprofile,
            contactpnumber,
            regno,
            PAN,
            address,
            city,
            zipcode,
            state,
            country,
            officetiming,
            holidays,
            workingdays,
            seekerpost,
            resumeUrl,
            otherUrl
        });

        const savedForm = await employer.save();

        res.status(200).json({
            success: true,
            message: "Form submitted successfully",
            data: savedForm,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while submitting the form",
            error: error.message,
        });
    }
};

// Controller for getting all forms
const getAllForms = async (req, res) => {
    try {
        const forms = await EmployerForm.find();
        res.json(forms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Controller for getting a single form
const getSingleForm = async (req, res) => {
    try {
        const { id } = req.params;
        let form = await EmployerForm.findById(id);
        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }

        // form.cvUrl = await getLink(form.cvUrl)
        // form.profileUrl = await getLink(form.profileUrl)
        // form.aadharUrl = await getLink(form.aadharUrl)
        res.json(form);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const updateSingleForm = async (req, res) => {
    const formId = req.params.id;
    const updatedForm = req.body;
    console.log(formId);
    console.log(updatedForm);
    try {
        const result = await EmployerForm.findByIdAndUpdate(formId, updatedForm, { new: true });
        if (!result) {
            return res.status(404).json({ message: 'Form not found' });
        }

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteSingleForm = async (req, res) => {
    const formId = req.params.id;

    try {
        console.log(formId);
        const deletedForm = await EmployerForm.findByIdAndDelete(formId);
        if (!deletedForm) {
            return res.status(404).json({ message: 'Form not found' });
        }

        res.json({ message: 'Form deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    submitForm,
    getAllForms,
    getSingleForm,
    updateSingleForm,
    deleteSingleForm
};