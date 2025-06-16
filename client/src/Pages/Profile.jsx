import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios.js';

const Profile = () => {
  const [user, setUser] = useState(null);

  const fetchAuthData = async () => {
    const res = await axiosInstance.get("/auth/profile", {
      withCredentials: true
    })
    .then(res => {
      setUser(res.data);
      console.log(res.data)
    })
    .catch(err => {
      window.location.href = "/"; 
    });
  };

  useEffect(() => {
  
    fetchAuthData();

  }, []);

  if (!user) return <p>Loading...</p>;

  return (
   
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold mb-2">Welcome bhai {user.name}</h1>
    <p>Email: {user.email}</p>
    <p>{user.loginMethod}</p> 
    <img src={user.photo} alt="User" className="mx-auto rounded-full w-32 mt-4" />
    </div>
    
  );
};

export default Profile;
