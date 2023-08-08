const IndividualForm = require('../../models/services/Registration&Certification/indivisualCertificationModel');
const { getFileByFilename, uploadFileToS3, getLink } = require('../../config/s3function')

// Controller for submitting a certification form
const submitForm = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      name,
      fatherName,
      dob,
      aadharNumber,
      panNumber,
      workingField,
      companyaddress1,
      companyaddress2,
      companycity,
      companystate,
      zipcode,
      companycountry,
      others,
      mobileNumber,
      email,
      requestLicense,
      photoUrl,
      aadharUrl,
      panUrl,
      signatureUrl
    } = req.body;

    const newForm = await IndividualForm.create({
      userId,
      name,
      fatherName,
      dob,
      aadharNumber,
      panNumber,
      workingField,
      companyaddress1,
      companyaddress2,
      companycity,
      companystate,
      zipcode,
      companycountry,
      others,
      mobileNumber,
      email,
      requestLicense,
      photoUrl,
      aadharUrl,
      panUrl,
      signatureUrl
    });

    res.status(200).json({ success: true, message: "Form Submitted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Controller for getting all certification forms
const getAllForms = async (req, res) => {
  try {
    const forms = await IndividualForm.find().select('address name mobileNumber workingField createdAt');
    res.json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Controller for getting a single certification form by ID
const getFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await IndividualForm.findById(id);

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
    const result = await IndividualForm.findByIdAndUpdate(formId, updatedForm, { new: true });
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
    const deletedForm = await IndividualForm.findByIdAndDelete(formId);
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
  deleteFormById,
};
