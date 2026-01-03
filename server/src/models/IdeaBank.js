const mongoose = require('mongoose');

const ideaBankSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, 'Client ID is required'],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Created by user ID is required'],
  },
  idea: {
    type: String,
    trim: true,
    default: '',
  },
  type: {
    type: String,
    trim: true,
    default: '',
  },
  stage: {
    type: String,
    trim: true,
    default: 'idea',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  scheduledFor: {
    type: Date,
    default: null,
  },
  platforms: {
    type: [String],
    default: [],
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
ideaBankSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('IdeaBank', ideaBankSchema);


