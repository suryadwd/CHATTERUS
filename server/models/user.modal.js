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
    enum: ['email', 'google','github'],
    default: 'email'
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  photo: {
    type: String,
  },
  githubId: {
  type: String,
  unique: true,
  sparse: true
},
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
