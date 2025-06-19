import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import session from "express-session";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.routes.js";
import { connectDb } from "./config/clouddb.js";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
let PORT = process.env.PORT || 3000;

const server = createServer(app);

const io = new Server(server,{
  cors:{
    origin: "http://localhost:5173",
    credentials: true,
  }
});

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use('/auth', authRoutes);

// Home
app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Login with Google</a>');
});


io.on("connection", (socket) => {
  console.log("A user connected backend");
  console.log("Id: ", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected backend");
    console.log("Id: ", socket.id);
  });

  // socket.emit("test", `Test event received, ${socket.id}`);
  // socket.broadcast.emit("test", `brodacateed test event received, ${socket.id}`);
  socket.broadcast.emit("test", `new user join room, ${socket.id}`);

});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
  connectDb();
  console.log(`http://localhost:${PORT}`);
});