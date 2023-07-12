const AuctionMaterialForm = require('../../models/services/AuctionMaterials/auctionmaterials');

// Controller for submitting a form
const submitForm = async (req, res) => {
  try {
    const userId = req.userId;
    const formData = req.body;
    formData.userId = userId;
    const newForm = await AuctionMaterialForm.create(formData);
    res.status(201).json({ success: true, data: newForm });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Controller for getting all forms
const getAllForms = async (req, res) => {
  try {
    const forms = await AuctionMaterialForm.find();
    res.status(200).json({ success: true, data: forms });
  } catch (error) {
    console.error('Error getting forms:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Controller for getting a form by ID
const getFormById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, req.params)
    const form = await AuctionMaterialForm.findById(id);

    if (!form) {
      return res.status(404).json({ success: false, error: 'Form not found' });
    }

    res.status(200).json({ success: true, data: form });
  } catch (error) {
    console.error('Error getting form:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};


const updateFormById = async (req, res) => {
  const formId = req.params.id;
  const updatedForm = req.body;
  console.log(formId);
  console.log(updatedForm);
  try {
    const result = await AuctionMaterialForm.findByIdAndUpdate(formId, updatedForm, { new: true });
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
    const deletedForm = await AuctionMaterialForm.findByIdAndDelete(formId);
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
  deleteFormById,
  updateFormById,
};
