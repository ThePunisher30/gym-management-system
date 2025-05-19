import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'trainer', 'member'],
    default: 'member'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  profilePicture: {
    type: String
  },
  stats: {
    workoutsCompleted: {
      type: Number,
      default: 0
    },
    classesBooked: {
      type: Number,
      default: 0
    },
    fitnessScore: {
      type: Number,
      default: 0
    }
  },
  membership: {
    type: {
      type: String,
      enum: ['none', 'basic', 'premium', 'elite'],
      default: 'none'
    },
    startDate: Date,
    endDate: Date
  }
});

export default mongoose.model('User', mongoose.models.User || userSchema);