const mongoose = require('mongoose');

const contentBriefSchema = new mongoose.Schema({
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
  concept: {
    type: String,
    trim: true,
    default: '',
  },
  explanation: {
    type: String,
    trim: true,
    default: '',
  },
  mood: {
    type: String,
    trim: true,
    default: '',
  },
  moodTags: {
    type: [String],
    default: [],
  },
  references: {
    type: [
      {
        type: {
          type: String,
          enum: ['link', 'image', 'video'],
          default: 'link',
        },
        url: String,
        title: String,
      },
    ],
    default: [],
  },
  contentType: {
    type: String,
    trim: true,
    default: '',
  },
  category: {
    type: String,
    enum: ['trending', 'general'],
    default: 'general',
  },
  teamsInvolved: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Department',
    default: [],
  },
  music: {
    type: {
      type: String,
      trim: true,
      default: '',
    },
    mood: {
      type: String,
      trim: true,
      default: '',
    },
    reference: {
      type: String,
      trim: true,
      default: '',
    },
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'approved'],
    default: 'pending',
  },
  currentStage: {
    type: String,
    trim: true,
    default: '',
  },
  notes: {
    type: [
      {
        authorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        text: {
          type: String,
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
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
contentBriefSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('ContentBrief', contentBriefSchema);

