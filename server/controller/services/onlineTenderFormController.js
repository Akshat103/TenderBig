const TenderOnlineModel = require("../../models/services/Tenders/onlineFormModel");

const submitForm = async (req, res) => {
    try {
        const userId = req.userId;
        req.body.userId = userId;
        const newRecord = await TenderOnlineModel.create(req.body);
        res.status(200).json({ success: true, newRecord });
    } catch (error) {
        res.status(500).json({ error: "Failed to create a new record" });
    }
};

const getAllForms = async (req, res) => {
    try {
        const records = await TenderOnlineModel.find();
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch records" });
    }
};

const getFormById = async (req, res) => {
    const { id } = req.params;
    try {
        const record = await TenderOnlineModel.findById(id);
        if (!record) {
            return res.status(404).json({ error: "Record not found" });
        }
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch the record" });
    }
};






const updateFormById = async (req, res) => {
    const formId = req.params.id;
    const updatedForm = req.body;
    console.log(formId);
    console.log(updatedForm);
    try {
        const result = await TenderOnlineModel.findByIdAndUpdate(formId, updatedForm, { new: true });
        if (!result) {
            return res.status(404).json({ message: 'Form not found' });
        }

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteFormById = async (req, res) => {
    const formId = req.params.id;
    try {
        console.log(formId);
        const deletedForm = await TenderOnlineModel.findByIdAndDelete(formId);
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
    getFormById,
    updateFormById,
    deleteFormById
};