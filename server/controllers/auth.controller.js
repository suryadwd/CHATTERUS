import  { User }  from "../models/user.modal.js";
import bcrypt from "bcrypt";
import { genTokenSetCookies } from "../utils/token.js";
import { sendEmail } from "../utils/email.js";
import otpGenerator from 'otp-generator';

// working
// adding the google auth and github auth next part 

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser){
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });}

    const hashpass = await bcrypt.hash(password, 10); 

    const idx = Math.floor(Math.random() * 100);
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const user = await new User({ name, email, password: hashpass, photo: randomAvatar }).save();

    //middleware to generate token and set cookies
    const payload = (user._id);

    genTokenSetCookies(payload, res);

    sendEmail(user.email, user.name, "Welcome to CHATTERUS",`Hello ${user.name } ,sir Welcome to our platform! We're glad you're here`);

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    console.log("error in register controller", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res ) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });

    //middleware to generate token and set cookies
    const payload = (existingUser._id);

    genTokenSetCookies(payload, res);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: existingUser,
    });
  } catch (error) {
    console.log("error in login controller", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const logout = async (req, res ) => {
  try {
    // Clear the cookie by setting its maxAge to 0
    res.cookie("jwtToken", "", { maxAge: 0 });

    return res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.log("error in logout controller", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const userId = req.user._id; 
 
    if (!userId)
      return res
        .status(400)
        .json({ success: false, message: "User not authenticated" });

    const user = await User.findById(userId).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    return res.status(200).json({
      success: true,
      message: "User information retrieved successfully",
      user,
    });
  } catch (error) {
    console.log("error in getUserInfo controller", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" }); 
  }
}

export const forgetPassword = async (req, res) => {
  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ success: false, message: "User not found" });
  
    const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false
    });

    user.resetPassOTP= otp;
    user.resetPassOTPExpires = new Date(Date.now() + 10 * 60 * 1000)
    await user.save();
    const resetLink = `http://localhost:5173/reset?email=${email}`;

    sendEmail(user.email, user.name, "Password Reset OTP valid for 10 minutes",`Hello ${user.name}, Your Password Reset OTP is ${otp}. Link to reset your password is ${resetLink}`);

    return res.status(200).json({ success: true, message: 'OTP sent to email' });

  } catch (error) {
    console.log("error in forgetPassword controller", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const resetPassword = async (req, res) => {
  try {

    const { email, otp, newPassword, confirmPassword } = req.body;

    if(newPassword !== confirmPassword) return res.status(400).json({ success: false, message: "Passwords do not match" });

    const user = await User.findOne({ email });

    if(!user) return res.status(404).json({ success: false, message: "User not found" });

    if(user.resetPassOTP !== otp  ) return res.status(400).json({ success: false, message: "Invalid OTP" });

    if(user.resetPassOTPExpires < Date.now()) return res.status(400).json({ success: false, message: "OTP expired" });

    const hashpass = await bcrypt.hash(newPassword, 10);

    user.password = hashpass;
    user.resetPassOTP = null;
    user.resetPassOTPExpires = null;

    await user.save();

    return res.status(200).json({ success: true, message: "Password reset successfully" });

  } catch (error) {
    console.log("error in resetPassword controller", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}



