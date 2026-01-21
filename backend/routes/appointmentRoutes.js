const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { CreateAppointment , getAppointments, cancelAppointment} = require("../controllers/AppointmentsController");

const router = express.Router();

router.post('/', protect, CreateAppointment);
router.get('/', protect, getAppointments);
router.delete('/:id', protect, cancelAppointment);


module.exports = router;