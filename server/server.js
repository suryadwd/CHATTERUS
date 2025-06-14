import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
app.use(cors());

import { connectDb } from "./config/clouddb.js";


let PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
  connectDb();
  console.log(`http://localhost:${PORT}`);
});