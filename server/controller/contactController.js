const ContactForm = require("../models/contactModel");

class Contact {

    async postContactForm(req, res) {
        try {
            const userId = req.userId;
            const { name, company, mobile, email, selectedService } = req.body;

            if (!name || !company || !mobile || !email || !selectedService) {
                return res.status(400).json({ error: "All fields are required" });
            }

            const contactForm = new ContactForm({
                userId,
                name,
                company,
                mobile,
                email,
                selectedService
            });

            await contactForm.save();

            res.json({ message: "Contact form submitted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred" });
        }
    }


    async getContactForms(req, res) {
        try {
            const contactForms = await ContactForm.find();

            res.json(contactForms);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred" });
        }
    }

    async getByService(req, res) {
        try {
            const { selectedService } = req.params;
            const contactForms = await ContactForm.find({ selectedService });
            res.json(contactForms);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
        }
    }

    async deleteById(req, res) {
        try {
            const { id } = req.params;
            const deleted = await ContactForm.findByIdAndDelete(id);
            if(deleted){
                res.status(200).json({
                    success:true,
                    message:"Form deleted successfully."
                });
            }else{
                res.status(404).json({
                    success:false,
                    message:"Form not found."
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
        }
    }

}

const contactController = new Contact();
module.exports = contactController;
