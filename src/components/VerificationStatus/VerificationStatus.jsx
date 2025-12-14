import { useState, useEffect } from "react";
import { message, Spin } from "antd";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const VerificationStatus = () => {
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  const checkVerificationStatus = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}users/check-verification`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setIsVerified(response.data.isVerified);
      } else {
        message.error(response.data.msg);
      }
    } catch (err) {
      message.error("Failed to check verification status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkVerificationStatus();
  }, []);

  const handleSendVerificationEmail = async () => {
    try {
      setSendingEmail(true);
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
      message.error("Failed to send verification email");
    } finally {
      setSendingEmail(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <Spin size="large" />
      </div>
    );
  }

  if (!loading && isVerified) {
    return null;
  }

  return (
    <div className="bg-transparent text-white p-4 rounded-lg border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Email Verification Status</h3>
          {isVerified ? (
            <FaCheckCircle className="text-green-500 text-xl" />
          ) : (
            <FaTimesCircle className="text-red-500 text-xl" />
          )}
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          isVerified ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
        }`}>
          {isVerified ? "Verified" : "Not Verified"}
        </span>
      </div>

      {!isVerified && (
        <div className="mt-4">
          <p className="text-sm text-gray-300 mb-3">
            Please verify your email address to access all features.
          </p>
          <button
            onClick={handleSendVerificationEmail}
            disabled={sendingEmail}
            className="w-full text-white bg-blue-600 p-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sendingEmail ? (
              <Spin size="small" />
            ) : (
              "Send Verification Email"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default VerificationStatus; 