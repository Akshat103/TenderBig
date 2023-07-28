const mongoose = require("mongoose");

const tenderModel = new mongoose.Schema(
    {
        tenderId: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        summary: {
            type: String,
            required: true
        },
        sector: {
            type: String,
            required: true
        },
        cpvNo: {
            type: String,
            required: false
        },
        procurementSummary: {
            country: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: false
            },
            summary: {
                type: String,
                required: false
            },
            deadline: {
                type: Date,
                required: true
            }
        },
        otherInformation: {
            noticeType: {
                type: String,
                required: false
            },
            totNo: {
                type: String,
                required: true
            },
            documentNo: {
                type: String,
                required: true
            },
            competition: {
                type: String,
                required: true
            },
            financier: {
                type: String,
                required: true
            },
            ownership: {
                type: String,
                required: true
            },
            tenderValue: {
                type: Number,
                required: true
            }
        },
        purchaserDetail: {
            purchaser: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: false
            },
            district: {
                type: String,
                required: false
            },
            state: {
                type: String,
                required: true
            },
            pin: {
                type: String,
                required: true
            },
            telfax: {
                type: String,
                required: false
            },
            email: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        },
        tenderDetail: {
            description: {
                type: String,
                required: false
            },
            publishDate: {
                type: Date,
                required: true
            },
            organization: {
                type: String,
                required: true
            },
            noticeType: {
                type: String,
                required: false
            }
        },
        userCategory: {
            type: String,
            enum: ["subcontractor", "contractor", "government", "gem", "private"],
            required: true
        },
        product: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        docurl: {
            type: String
        },
        active: {
            type: Boolean,
            default: false
        },
        approvedStatus: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Apply-Tender", tenderModel);