import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { message, Spin } from "antd";
import axios from "axios";
import earth from "../assets/formstep-1-2.jpg";

const VerifyEmail = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}users/verify-email/${code}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          message.success("Email verified successfully!");
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        } else {
          setError(response.data.msg);
        }
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to verify email. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [code, navigate]);

  const handleResendVerification = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}users/check-verification`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        message.success("Verification email sent successfully!");
      } else {
        message.error(response.data.msg);
      }
    } catch (err) {
      message.error("Failed to send verification email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${earth})`,
      }}
    >
      <div className="bg-transparent text-white border bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full">
        <Spin spinning={loading} size="large">
          {error ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-6">Verification Failed</h2>
              <p className="mb-6 text-red-400">{error}</p>
              <button
                onClick={handleResendVerification}
                className="text-white bg-blue-600 p-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Resend Verification Email
              </button>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-6">Verifying Your Email</h2>
              <p className="mb-6">Please wait while we verify your email address...</p>
            </div>
          )}
        </Spin>
      </div>
    </div>
  );
};

export default VerifyEmail; 