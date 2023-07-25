const tenderResultModel = require("../models/tenderResultModel");
const { toTitleCase, generateUUID } = require("../config/functions")
const { regionData, geopoliticalData } = require("../config/countriesData");

class TenderResult {
    async postAddTenderResults(req, res) {
        let {
            summary,
            BRR,
            Authority,
            userCategory,
            TendorNo,
            country,
            state,
            city,
            deadline,
            contractValue,
            tenderValue,
            description,
            sector
        } = req.body;

        const userId = req.userId;

        try {
            summary = toTitleCase(summary);

            const tenderId = generateUUID();

            const procurementSummary = {
                country,
                state,
                city,
                deadline: new Date(deadline)
            };

            const newTender = new tenderResultModel({
                userId,
                summary,
                country,
                state,
                city,
                deadline: new Date(deadline),
                description,
                BRR,
                Authority,
                userCategory,
                TendorNo,
                TenderId: tenderId,
                contractValue,
                tenderValue,
                sector
            });
            console.log(newTender);
            newTender.save()
                .then((data) => {
                    return res.json({
                        success: "Tender filled successfully.",
                    });
                })
                .catch((err) => {
                    console.log(err);
                });

        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: err });
        }

    }

    async getTenderResults(req, res) {
        try {
            const documents = await tenderResultModel.find();
            res.json(documents);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to retrieve documents.' });
        }
    }

    async getTenderResultsByTenderId(req, res) {
        const tenderId = req.params.TenderResultId;
        if (!tenderId) {
            return res.json({ error: "All filled must be required" });
        } else {
            try {
                let singleTender = await tenderResultModel.find({ tenderId: tenderId });
                if (singleTender) {
                    return res.json({ Product: singleTender });
                }
            } catch (err) {
                console.log(err);
            }
        }

    }

    async updateResultsFormById(req, res) {
        const formId = req.params.id;
        const updatedForm = req.body;
        console.log(formId);
        console.log(updatedForm);
        try {
            const result = await tenderResultModel.findByIdAndUpdate(formId, updatedForm, { new: true });
            if (!result) {
                return res.status(404).json({ message: 'Result not found' });
            }

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteResultsFormById(req, res) {
        const formId = req.params.id;

        try {
            console.log(formId);
            const deletedForm = await tenderResultModel.findByIdAndDelete(formId);
            if (!deletedForm) {
                return res.status(404).json({ message: 'Result not found' });
            }

            res.json({ message: 'Result deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async search(req, res) {
        try {
            const currentDate = new Date();
            const query = {
                'deadline': { $gte: currentDate }
            };

            const userSubscription = req.userSubscription;

            if (userSubscription.status != "active") {
                return res.status(401).json({
                    success: false,
                    message: "Buy Subscription."
                });
            }

            if (userSubscription.type == "One State Plan") {
                const state = userSubscription.state;
                query['state'] = state;
            } else if (userSubscription.type == "All India") {
                query['country'] = "India";
            }

            const { region, geopolitical, country, sector, state, city, value } = req.query;

            if (region && regionData.hasOwnProperty(region) && userSubscription.type == "Global") {
                const countriesInRegion = regionData[region];
                query['country'] = { $in: countriesInRegion };
            }
            if (geopolitical && geopoliticalData.hasOwnProperty(geopolitical) && userSubscription.type == "Global") {
                const countriesInGeopolitical = geopoliticalData[geopolitical];
                query['country'] = { $in: countriesInGeopolitical };
            }
            if (country && userSubscription.type == "Global") {
                query['country'] = country;
            }
            if (sector) {
                query['sector'] = sector;
            }
            if (state) {
                query['state'] = state;
            }
            if (city) {
                query['city'] = city;
            }
            if (value) {
                query['tenderValue'] = { $gt: value };
            }
console.log(query)
            const results = await tenderResultModel.find(query);
            res.json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred during the search' });
        }
    }
}

const tenderResultController = new TenderResult();
module.exports = tenderResultController;