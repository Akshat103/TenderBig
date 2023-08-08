const JointVentureForm = require("../../models/services/JointVenture/jointventure");

// Submit a new document
const submitForm = async (req, res) => {
    try {
        const userId = req.userId;
        req.body.userId = userId;
        const newDocument = await JointVentureForm.create(req.body);
        res.status(201).json({ success: true, newDocument });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to submit the document.' });
    }
};

// Get all documents
const getAllForms = async (req, res) => {
    try {
        const documents = await JointVentureForm.find();
        res.json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve documents.' });
    }
};

// Get a document by ID
const getFormById = async (req, res) => {
    const { id } = req.params;

    try {
        const document = await JointVentureForm.findById(id);
        if (!document) {
            return res.status(404).json({ error: 'Document not found.' });
        }
        res.json(document);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve the document.' });
    }
};

const updateFormById = async (req, res) => {
    const formId = req.params.id;
    const updatedForm = req.body;
    console.log(formId);
    console.log(updatedForm);
    try {
        const result = await JointVentureForm.findByIdAndUpdate(formId, updatedForm, { new: true });
        if (!result) {
            return res.status(404).json({ message: 'Form not found' });
        }

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteFormById = async (req, res) => {
    const formId = req.params.id;

    try {
        console.log(formId);
        const deletedForm = await JointVentureForm.findByIdAndDelete(formId);
        if (!deletedForm) {
            return res.status(404).json({ message: 'Form not found' });
        }

        res.json({ message: 'Form deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = { submitForm, getAllForms, getFormById, deleteFormById, updateFormById };