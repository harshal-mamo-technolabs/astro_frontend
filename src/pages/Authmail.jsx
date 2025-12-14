// import { useState, useEffect } from "react";
// import { Input, Form, Button, notification } from "antd";
import earth from "../assets/formstep-1-2.jpg";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AuthPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [timer, setTimer] = useState(0);
//   const [isCodeSent, setIsCodeSent] = useState(false);
//   const [form] = Form.useForm();
//   const [profile, setProfile] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     let interval;
//     if (isCodeSent && timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prevTimer) => prevTimer - 1);
//       }, 1000);
//     } else if (timer === 0) {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isCodeSent, timer]);

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BASE_URL}users/me/full`, {
//         withCredentials: true,
//       })
//       .then((res) => {
//         setProfile(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//       if(profile?.verified){
//         navigate("/home")
//        }
//   }, [profile]);

//   const handleSendCode = () => {
//     form.validateFields().then(() => {
//       // Simulate sending the code
//       console.log("Sending code to:", email);

//       // Show notification
//       notification.info({
//         message: "Verification Email Sent",
//         description:
//           "A verification link has been sent to your email. Please verify your email to continue.",
//         placement: "topRight",
//         duration: 5, // Notification will disappear after 5 seconds
//       });

//       setIsCodeSent(true);
//       setTimer(120); // Set timer to 2 minutes (120 seconds)
//     }).catch(error => {
//       // Handle form validation errors
//     });
//   };

//   return (
//     <div
//       className="flex justify-center items-center min-h-screen bg-cover bg-center"
//       style={{
//         backgroundImage: `url(${earth})`,
//       }}
//     >
//       <div className="bg-transparent text-white border bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full">

//       </div>
//     </div>
//   );
// };

// export default AuthPage;

import { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthPage = () => {
  const [isEmailResent, setIsEmailResent] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [dataProfile, setDataProfile] = useState(null);
  console.log(dataProfile, "data profile");

  const sendVerifyEmail = async () => {
    setLoading(true);
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}users/check-verification`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await res.json();
    if (!data.success) {
      // alert(data.msg);
      // navigate('/login')
    }

    setLoading(false);
  };

  const fetchUser = async () => {
    setLoading(true);
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}users/me/full`, {
      method: 'GET',
      credentials: 'include'
    });
    const data = await res.json()
    setLoading(false);
    if (data.success) {
      if (data.data.verified) {
        navigate('/home');
      }
      else {
        sendVerifyEmail();
      }
    }
    else {
      console.log(data.msg);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleResendEmail = () => {
    setIsEmailResent(true);
    sendVerifyEmail();
    message.info("Verification email resent. Please check your inbox.");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${earth})` }}
    >
      <div className="bg-transparent text-white border bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Required: Verify Your Email</h2>
        <p className="mb-6">
          A verification link has been sent to your email. Please verify your
          account to continue. If you didn't receive the email, click the button
          below to resend it.
        </p>
        <button
          type="default"
          onClick={handleResendEmail}
          disabled={isEmailResent}
          className="text-white bg-blue-600 p-2 rounded-md"
        >
          {isEmailResent ? "Email Resent" : "Resend Verification Email"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
