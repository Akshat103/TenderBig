const RegistrationForm = require('../../models/services/Registration&Certification/registrationModel');

// Controller for submitting a registration form
const submitForm = async (req, res) => {
  try {
    const userId = req.userId
    const {
      company,
      mobile,
      secMobile,
      email,
      cwebsite,
      CIN,
      wmobile,
      cprofile,
      companyEstd,
      otherDetails,
      companypost,
      liscence,
      cpname,
      category,
      fname,
      GST,
      PAN,
      address,
      companycountry,
      companycity,
      companystate,
      regUrl,
      gstUrl,
      panUrl
    } = req.body;

    const newReg = await RegistrationForm.create({
      userId,
      company,
      mobile,
      secMobile,
      email,
      cwebsite,
      CIN,
      wmobile,
      cprofile,
      companyEstd,
      otherDetails,
      companypost,
      liscence,
      cpname,
      category,
      fname,
      GST,
      PAN,
      address,
      companycountry,
      companycity,
      companystate,
      regUrl,
      gstUrl,
      panUrl
    });

    res.status(201).json({ success: true, data: newReg });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller for getting all registration forms
const getAllForms = async (req, res) => {
  try {
    const forms = await RegistrationForm.find();
    res.json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Controller for getting a single registration form by ID
const getFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await RegistrationForm.findById(id);

    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }

    res.json(form);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const updateFormById = async (req, res) => {
  const formId = req.params.id;
  const updatedForm = req.body;
  console.log(formId);
  console.log(updatedForm);
  try {
    const result = await RegistrationForm.findByIdAndUpdate(formId, updatedForm, { new: true });
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
    const deletedForm = await RegistrationForm.findByIdAndDelete(formId);
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
