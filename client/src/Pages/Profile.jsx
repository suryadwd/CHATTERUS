import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:7000/auth/profile", {
      withCredentials: true
    })
    .then(res => {
      setUser(res.data);
    })
    .catch(err => {
      window.location.href = "/"; // Redirect to login
    });
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="bg-gradient-to-br from-red-800 via-zinc-900 to-blue-900 min-h-screen flex items-center justify-center">
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold mb-2">Welcome {user.displayName}</h1>
      <p>Email: {user.email}</p>
      <p>sab bhadiya hai </p>
      <img src={user.photos?.[0]?.value} alt="User" className="mx-auto rounded-full w-32 mt-4" />
    </div>
    </div>
  );
};

export default Profile;
