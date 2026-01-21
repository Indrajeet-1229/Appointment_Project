const Appointment = require('../models/AppointmentSchema')

const CreateAppointment = async (req, res) => {
    const { date, time } = req.body;
    console.log(date,time)

    if (!date || !time) {
        return res.status(400).json({
            success: false,
            message: "Date and Time are required"
        });
    }
    try {
        const appointment = await Appointment.create({
            user: req.user.id,
            date,
            time
        })
        return res.status(201).json({
            success: true,
            message: "Appointment booked",
            appointment
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Server error"
        });
    }
}

const getAppointments = async (req, res) => {
    const appointments = await Appointment.find({
        user: req.user.id
    })
  
    return res.json({appointments});
}

const cancelAppointment = async (req, res) => {
    const appointment = await Appointment.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id
    })
    if (!appointment) {
        return res.status(404).json({
            success: false,
            message: "Appointment not found"
        })
    }
    return res.json({ success:true,message: "Appointment cancelled" });
}

module.exports = { CreateAppointment, getAppointments, cancelAppointment }
