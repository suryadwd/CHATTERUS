import { useState } from "react";

const Forgetpass = () => {
  const [input, setInput] = useState('');

  const handelOtp = async() => {
    const res = await axiosInstance.post(`/auth/forgetpass`, data, {
      withCredentials: true
    })
    if (res.data.success) {
      toast.success("OTP send successful!");
      navigate('/home');
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

        <h3 className="text-sm text-gray-400 mt-1">OTP is valid for only 5 minutes...</h3>

      <div className="flex flex-col gap-4 mt-4">
      <input
       type="text"
       placeholder="Email"
       className=" bg-white text-black px-10 py-1.5 rounded-xl align-left" 
       onChange={e => setData({...data,email: e.target.value})}
      />

      <button
      //  onClick={handelOtp}
       className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
       Get OTP
      </button>
      </div>

      


      </div>
    </div>
  )
}

export default Forgetpass
