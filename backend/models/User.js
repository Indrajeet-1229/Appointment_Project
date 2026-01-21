const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["pending", "active", "completed", "failed"],
    default: "pending",
  },
  taskTitle: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
    required: true,
  },
  taskDate: {
    type: String, 
    required: true,
  },
  category: {
    type: String,
  },
  notes: {
    type: [String],
    default: [],
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  }
},{ timestamps: true });

module.exports = mongoose.model("User", userSchema);
