const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters'],
    select: false, // Don't return password by default
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    default: null,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  invitedOn: {
    type: Date,
    default: null,
  },
  joinedOn: {
    type: Date,
    default: null,
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

// Hash password before saving (only if password is provided and modified)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    this.lastEditedAt = Date.now();
    next();
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.lastEditedAt = Date.now();
  next();
});

// Update lastEditedAt on update operations
userSchema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
  this.set({ lastEditedAt: Date.now() });
  next();
});

// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

