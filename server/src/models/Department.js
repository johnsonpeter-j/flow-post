const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a department name'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide the creator'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastEditedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the lastEditedAt field before saving
departmentSchema.pre('save', function (next) {
  this.lastEditedAt = Date.now();
  next();
});

module.exports = mongoose.model('Department', departmentSchema);


