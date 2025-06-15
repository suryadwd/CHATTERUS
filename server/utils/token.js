import { Response } from "express"
import jwt from "jsonwebtoken"



export const genTokenSetCookies = async (payload) => {

  const token = jwt.sign({ id: payload },  process.env.JWT_SECRET , { expiresIn: '5d' });

  res.cookie("jwtToken",token,{maxAge:5*24*60*60*1000})

}