const mongoose = require("mongoose");
const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  change: {
    type: Number,
    required: true,
  },
  completedDays: {
    type: Number,
    required: true,
  },
  WeeklyAvg: {
    type: Number,
    required: true,
  },
  CurrentStreak: {
    type: Number,
    required: true,
  },
  LongestStreak: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
