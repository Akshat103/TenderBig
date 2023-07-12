const SeekerForm = require('../../models/services/CareerManPower/seekerModel');

// Controller for form submission
const submitForm = async (req, res) => {
    try {
        const userId = req.userId;
        const {

            name,
            fathername,
            aadhar,
            tenMarkType,
            tenMark,
            twelveMarkType,
            twelveMark,
            jobpost,
            jobexp,
            address,
            company,
            city,
            state,
            country,
            mobile,
            email,
            zip,
            pastSalary,
            expectedSalary,
            hobbies,
            pan,
            resumeUrl,
            photoUrl,
            aadharUrl
        } = req.body;

        const newSeeker = await SeekerForm.create({
            userId,
            name,
            fathername,
            aadhar,
            tenMarkType,
            tenMark,
            twelveMarkType,
            twelveMark,
            jobpost,
            jobexp,
            address,
            company,
            city,
            state,
            country,
            mobile,
            email,
            zip,
            pastSalary,
            expectedSalary,
            hobbies,
            pan,
            resumeUrl,
            photoUrl,
            aadharUrl
        });

        res.status(201).json({ success: true, data: newSeeker });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller for getting all forms
const getAllForms = async (req, res) => {
    try {
        const forms = await SeekerForm.find();
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
        const form = await SeekerForm.findById(id);
        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }
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
        const result = await SeekerForm.findByIdAndUpdate(formId, updatedForm, { new: true });
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
        const deletedForm = await SeekerForm.findByIdAndDelete(formId);
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
    deleteSingleForm,
};
