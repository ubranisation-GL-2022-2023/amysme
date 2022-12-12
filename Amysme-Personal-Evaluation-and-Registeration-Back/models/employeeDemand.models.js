const mongoose = require("mongoose");

const EmployeeDemandSchema = new mongoose.Schema({
    demandId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
    },
    reason: {
        type: Number,
    },
    comment: {
        type: String,
    },
    status: {
        type: Number,
    },
});

const EmployeeDemand = mongoose.model("EmployeeDemand", EmployeeDemandSchema);

module.exports = EmployeeDemand;