import "./App.css" 
import { Routes, Route } from 'react-router-dom';
import {io} from "socket.io-client";
import { useEffect } from 'react';
import Login from './Pages/Login.jsx';
import Home from './Pages/Home.jsx';
import Profile from "./Pages/Profile.jsx";
import Signup from "./Pages/Signup.jsx";
import Forgetpass from "./Pages/Forgetpass.jsx";
const App = () => {

  const socket = io("http://localhost:7000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected hai frontend");
      console.log("Id: ", socket.id);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected hai frontend");
      console.log("Id: ", socket.id);
    });

    socket.on("test", d => { console.log(d)});

  },[])

  return (
   <div className="bg-gradient-to-br from-red-800 via-zinc-900 to-blue-900 min-h-screen flex items-center justify-center">
     <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/auth/signup" element={<Signup/>} />
        <Route path="/auth/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/forget" element={<Forgetpass/>} />

     </Routes>
   </div>

  )
}

export default App
