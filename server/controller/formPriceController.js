const Price = require('../models/formPriceModel');

// Get the form price by form name
exports.getFormPrice = (req, res) => {
    const { formName } = req.params;

    Price.findOne({ formName })
        .then(formPrice => {
            if (!formPrice) {
                return res.status(404).json({ error: 'Form price not found' });
            }
            res.json(formPrice);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
};

// Update the form price
exports.updateFormPrice = (req, res) => {
    const { formName } = req.params;
    const { price } = req.body;

    Price.findOneAndUpdate({ formName }, { price }, { new: true })
        .then(updatedFormPrice => {
            if (!updatedFormPrice) {
                return res.status(404).json({ error: 'Form price not found' });
            }
            res.json(updatedFormPrice);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
};

// Submit a form
exports.submitForm = (req, res) => {
    const { formName, price } = req.body;

    // Create a new form submission entry
    const newFormSubmission = new Price({
        formName,
        price,
    });

    // Save the form submission to the database
    newFormSubmission.save()
        .then(savedFormSubmission => {
            res.json(savedFormSubmission);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
};

// Get all form prices
exports.getAllFormPrices = async (req, res) => {
    try {
        console.log("hit")
        const formPrices = await Price.find();
        res.json(formPrices);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching formPrices' });
    }
};