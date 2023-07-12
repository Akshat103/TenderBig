const TenderOfflineForm = require("../../models/services/Tenders/offlineFormModel");

// Submit Tender Offline Form
const submitForm = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, company, mobile, email, aadhar, role } = req.body;
    const tenderOfflineForm = new TenderOfflineForm({
      name,
      userId,
      company,
      mobile,
      email,
      aadhar,
      role,
    });
    const savedForm = await tenderOfflineForm.save();
    res.json(savedForm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get All Tender Offline Forms
const getAllForms = async (req, res) => {
  try {
    const forms = await TenderOfflineForm.find();
    res.json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get Single Tender Offline Form by ID
const getSingleForm = async (req, res) => {
  try {
    const formId = req.params.id;
    const form = await TenderOfflineForm.findByIdAndDelete(formId);
    // if (!form) {
    //   return res.status(404).json({ error: "Form not found" });
    // }
    res.json(form);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  submitForm,
  getAllForms,
  getSingleForm,
};
