const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  timing: String,
  faculty: String,
  subject: String,
});

const TimeTableSchema = new mongoose.Schema({
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  timetable: {
    monday: [ScheduleSchema],
    tuesday: [ScheduleSchema],
    wednesday: [ScheduleSchema],
    thursday: [ScheduleSchema],
    friday: [ScheduleSchema],
  },
});

module.exports = mongoose.model('TimeTable', TimeTableSchema);