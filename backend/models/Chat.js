const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  username: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  room: {
    type: String,
    default: 'general',
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for faster queries
ChatSchema.index({ createdAt: -1 });
ChatSchema.index({ room: 1, createdAt: -1 });

module.exports = mongoose.model('Chat', ChatSchema);

