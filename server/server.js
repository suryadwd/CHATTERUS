import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import { connectDb } from "./config/clouddb.js";
import cors from "cors";
app.use(cors());
import { Server } from "socket.io";
import { createServer } from "http";
let PORT = process.env.PORT || 3000;

const io = new Server(createServer(app));

io.on("connection", (socket) => {
  console.log("A user connected");
  console.log("Id: ", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    console.log("Id: ", socket.id);
  });

})



app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
  connectDb();
  console.log(`http://localhost:${PORT}`);
});