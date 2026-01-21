const mongoose = require("mongoose");

const appointmentScheama = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        refrence: "User",
        required: true
    },
    date: {
        type: String,
        reqired: true
    },
    time: {
        type: String,
        required: true
    },

}, { timestamps: true });

const Appointment = mongoose.model('appointment', appointmentScheama);
module.exports = Appointment;