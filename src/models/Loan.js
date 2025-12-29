const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
    {
    asset: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asset",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    borrowedAt: {
        type: Date,
        default: Date.now,
    },
    returnedAt: {
        type: Date,
        default: null,
    },
    },
    { timestamps: true }
    
);

module.exports = mongoose.model("Loan", loanSchema);