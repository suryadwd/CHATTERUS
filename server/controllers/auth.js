import  { User }  from "../models/user.modal.js";
import bcrypt from "bcrypt";
import { genTokenSetCookies } from "../utils/token.js";
import { sendWelcomeEmail } from "../utils/email.js";

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

    const user = await new User({ name, email, password: hashpass }).save();

    //middleware to generate token and set cookies
    const payload = (user._id);

    genTokenSetCookies(payload, res);

    sendWelcomeEmail(user.email, user.name);

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
        .json({ success: false, message: "Invalid credentials" });

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


import { Router } from "express";

const router = Router();

