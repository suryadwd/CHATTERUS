import { useState } from "react";
import axiosInstance from "../utils/axios";
import { toast } from 'react-toastify';
const Forgetpass = () => {
  const [email, setEmail] = useState('');
  const [view, setView] = useState(false);

  

  const handelOtp = async() => {
    console.log(email)
    const res = await axiosInstance.post(`/auth/forgetPassword`,  {email}, {
      withCredentials: true
    })
    if (res.data.success) {
      sessionStorage.setItem('resetEmail', email)
      toast.success("OTP send successful!");
    } else {
      toast.error(res.data.message);
    }
  }


  return (
    <div className="bg-gradient-to-b from-black to-blue-600 text-white p-8 rounded-lg shadow-lg w-96">
      <div className="flex flex-col items-center">
        <div>
        <h1 className="text-2xl font-bold">Enter your email here...</h1>
      </div>

        <h3 className="text-sm text-gray-400 mt-1.5">OTP is valid for only 5 minutes...</h3>

      <div className="flex flex-col gap-4 mt-4">
      <input
       type="text"
       placeholder="Email"
       className=" bg-white text-black px-10 py-1.5 rounded-xl align-left" 
       onChange={e => setEmail(e.target.value)}

      />

      <button
       onClick={() => {
        handelOtp();
        setView(true)
        }
      }
       
       className="bg-green-500 rounded-xl hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
       Get OTP
      </button>
      </div>

      {view && <h3 className="text-sm text-gray-400 mt-3">Check your email</h3>}


      </div>
    </div>
  )
}

export default Forgetpass
