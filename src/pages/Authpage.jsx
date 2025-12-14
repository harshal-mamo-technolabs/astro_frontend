// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Spin } from "antd";
// import earth from "../assets/formstep-1-2.jpg";
// import { LoadingOutlined } from "@ant-design/icons";

// const AuthIdPage = () => {
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Simulate loading process
//   setTimeout(() => {
//     setLoading(false);
//   }, 4000); // Simulating a 3-second loading process

//   // Redirect to the home page after loading
//   if (!loading) {
//     navigate("/home");
//   }

//   return (
//     <div
//       className=" bg-cover bg-center"
//       style={{
//         backgroundImage: `url(${earth})`,
//       }}
//     >
//       <div className="flex justify-center items-center min-h-screen">
//         <Spin
//           indicator={
//             <LoadingOutlined
//               style={{
//                 fontSize: 90,
//                 fontWeight: 700,
//               }}
//               spin
//             />
//           }
//         />
//       </div>
//     </div>
//   );
// };

// export default AuthIdPage;

import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Spin } from "antd";
import axios from "axios";
import earth from "../assets/formstep-1-2.jpg";
import { CardContext } from "../context/CardsDataContext";

const AuthIdPage = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [decodedId, setDecodedId] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const { setFullprofile } = useContext(CardContext);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}users/me/full`, {
        withCredentials: true,
      })
      .then((res) => {
        setProfile(res.data.data);
        console.log(res.data, "auth data");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loading]);
  useEffect(() => {
    try {
      const decoded = decodeURIComponent(id);
      setDecodedId(decoded);
    } catch (error) {
      console.error("Failed to decode the ID:", error);
    }
  }, [id]);
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}users/verify/${decodedId}`,
        {
          password: values.password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(()=>{
        message.success("Your password has been set.");
        navigate("/login");
      })
      
    
    } catch (error) {
      message.error(error?.response.data.msg);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}users/me/full`, {
        withCredentials: true,
      })
      .then((res) => {
        setFullprofile(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loading]);
  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}users/resend-verification`,
        {
          email: "user@example.com",
        }
      );
      message.success("Verification email resent. Please check your inbox.");
    } catch (error) {
      message.error("Failed to resend verification email. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${earth})`,
      }}
    >
      <div className=" w-[35%]">
        <Spin spinning={loading} size="large">
          <div className="bg-transparent text-white border bg-opacity-90 p-8 rounded-lg shadow-lg ">
            <h2 className="text-2xl font-bold mb-6">Set Your Password</h2>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label={<span style={{ color: "white" }}>Password</span>}
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input.Password placeholder="Enter your password" />
              </Form.Item>
              <Form.Item>
                <div className="flex justify-center ">
                  <button
                    type="submit"
                    className="w-[40%] text-white bg-blue-600 p-2 rounded-md"
                  >
                    Continue
                  </button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default AuthIdPage;
