import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
