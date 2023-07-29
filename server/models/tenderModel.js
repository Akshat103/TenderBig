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
            required: true,
            set: (value) => {
                // Convert to sentence case
                if (typeof value !== 'string' || value.length === 0) return value;
                return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            },
        },
        sector: {
            type: String,
            required: true,
            set: (value) => {
                // Convert to sentence case
                if (typeof value !== 'string' || value.length === 0) return value;
                return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            },
        },
        cpvNo: {
            type: String,
            required: false,
            set: (value) => value.toUpperCase(),
        },
        procurementSummary: {
            country: {
                type: String,
                required: true,
                set: (value) => {
                    // Convert to sentence case
                    if (typeof value !== 'string' || value.length === 0) return value;
                    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                },
            },
            state: {
                type: String,
                required: true,
                set: (value) => {
                    // Convert to sentence case
                    if (typeof value !== 'string' || value.length === 0) return value;
                    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                },
            },
            city: {
                type: String,
                required: false,
                set: (value) => {
                    // Convert to sentence case
                    if (typeof value !== 'string' || value.length === 0) return value;
                    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                },
            },
            summary: {
                type: String,
                required: false,
                set: (value) => {
                    // Convert to sentence case
                    if (typeof value !== 'string' || value.length === 0) return value;
                    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                },
            },
            deadline: {
                type: Date,
                required: true
            }
        },
        otherInformation: {
            noticeType: {
                type: String,
                required: false,
                set: (value) => {
                    // Convert to sentence case
                    if (typeof value !== 'string' || value.length === 0) return value;
                    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                },
            },
            totNo: {
                type: String,
                required: true,
                set: (value) => value.toUpperCase(),
            },
            documentNo: {
                type: String,
                required: true,
                set: (value) => value.toUpperCase(),
            },
            competition: {
                type: String,
                required: true,
                set: (value) => {
                    // Convert to sentence case
                    if (typeof value !== 'string' || value.length === 0) return value;
                    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                },
            },
            financier: {
                type: String,
                required: true,
                set: (value) => {
                    // Convert to sentence case
                    if (typeof value !== 'string' || value.length === 0) return value;
                    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                },
            },
            ownership: {
                type: String,
                required: true,
                set: (value) => {
                    // Convert to sentence case
                    if (typeof value !== 'string' || value.length === 0) return value;
                    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                },
            },
            tenderValue: {
                type: Number,
                required: true
            }
        },
        purchaserDetail: {
            purchaser: {
                type: String,
                required: true,
                set: (value) => {
                    // Convert to sentence case
                    if (typeof value !== 'string' || value.length === 0) return value;
                    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                  },
            },
            address: {
                type: String,
                required: true,
                set: (value) => {
                    // Convert to sentence case
                    if (typeof value !== 'string' || value.length === 0) return value;
                    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                  },
            },
            city: {
                type: String,
                required: false,
                set: (value) => {
                    // Convert to sentence case
                    if (typeof value !== 'string' || value.length === 0) return value;
                    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                  },
            },
            district: {
                type: String,
                required: false,
                set: (value) => {
                    // Convert to sentence case
                    if (typeof value !== 'string' || value.length === 0) return value;
                    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                  },
            },
            state: {
                type: String,
                required: true,
                set: (value) => {
                    // Convert to sentence case
                    if (typeof value !== 'string' || value.length === 0) return value;
                    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                  },
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
                required: false,
                set: (value) => {
                    // Convert to sentence case
                    if (typeof value !== 'string' || value.length === 0) return value;
                    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                  },
            },
            publishDate: {
                type: Date,
                required: true
            },
            organization: {
                type: String,
                required: true,
                set: (value) => {
                    // Convert to sentence case
                    if (typeof value !== 'string' || value.length === 0) return value;
                    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                  },
            },
            noticeType: {
                type: String,
                required: false,
                set: (value) => {
                    // Convert to sentence case
                    if (typeof value !== 'string' || value.length === 0) return value;
                    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                  },
            }
        },
        userCategory: {
            type: String,
            enum: ["subcontractor", "contractor", "government", "gem", "private"],
            required: true
        },
        product: {
            type: String,
            required: true,
            set: (value) => {
                // Convert to sentence case
                if (typeof value !== 'string' || value.length === 0) return value;
                return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
              },
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