const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a client name'],
    trim: true,
  },
  businessType: {
    type: String,
    required: [true, 'Please provide a business type'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  website: {
    type: String,
    trim: true,
    default: '',
    match: [
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
      'Please provide a valid website URL',
    ],
  },
  mail: {
    type: String,
    required: [true, 'Please provide an email'],
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  phone: {
    type: String,
    trim: true,
    default: '',
  },
  brandColor: {
    type: String,
    trim: true,
    default: '#3B82F6', // Default blue color
    match: [
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
      'Please provide a valid hex color code',
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
clientSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Client', clientSchema);
