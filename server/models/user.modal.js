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
    required: true,
    unique: true
  },
  displayName: String,
  email: String,
  photo: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
