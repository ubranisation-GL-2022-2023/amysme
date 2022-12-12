const mongoose = require("mongoose");

const ReclamationSchema = new mongoose.Schema({
    reclamationId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
    },
    content: {
        type: String,
    },
    status: {
        type: Number,
    },
});

const Reclamation = mongoose.model("Reclamation", ReclamationSchema);

module.exports = Reclamation;