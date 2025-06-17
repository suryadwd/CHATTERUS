import { useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axiosInstance from "../utils/axios";
import { toast } from 'react-toastify';

const ResetPass = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email"); 

  const [data, setData] = useState({
    otp:"",
    newPassword:"",
    confirmPassword:""
  });

 const handelSubmit = async () => {

  const res = await axiosInstance.post(`/auth/resetpassword`, {
    ...data,
    email
  }, {
    withCredentials: true
  });

  if (res.data.success) {
    toast.success("Password reset successful!");
    navigate('/login');
  } else {
    toast.error(res.data.message);
  }
};



  return (
    <div className="bg-gradient-to-b from-black to-blue-600 text-white p-8 rounded-lg shadow-lg w-96">
      <div className="flex flex-col items-center">
        <div>
        <h1 className="text-2xl font-bold">Enter your credentials...</h1>
      </div>

      <div className="flex flex-col gap-4 mt-4">

      <input
       type="text"
       placeholder="OTP"
       className=" bg-white text-black px-10 py-1.5 rounded-xl align-left" 
       onChange={e => setData({...data,otp: e.target.value})}
      />
      <input
       type="password"
       placeholder="New Password"
       className=" bg-white text-black px-10 py-1.5 rounded-xl align-left" 
       onChange={e => setData({...data,newPassword: e.target.value})}
      />
      <input
       type="password"
       placeholder="Confirm Password"
       className=" bg-white text-black px-10 py-1.5 rounded-xl align-left" 
       onChange={e => setData({...data,confirmPassword: e.target.value})}
      />
      

      <button
       onClick={handelSubmit}
       className="bg-green-500 rounded-xl hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
       Confirm
      </button>
      </div>
      </div>
    </div>
  )
}

export default ResetPass
