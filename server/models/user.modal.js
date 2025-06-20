import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  
  name:{
    type: String,
  },
  email:{
    type:String
  },
  password:{
    type:String
  },
  loginMethod: {
    type: String,
    enum: ['email', 'google','github','linkedin'],
    default: 'email'
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  photo: {
    type: String,
    default:""
  },
  githubId: {
  type: String,
  unique: true,
  sparse: true
  },
  linkedinId: {
    type: String,
    unique: true,
    sparse: true
  },
  resetPassOTP: {
    type: String
  },
  resetPassOTPExpires: {
  type: Date
  },
  bio:{
    type: String,
    default:""
  },
  canLaunch:{
    type: Boolean,
    default: false
  },
  friends:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
