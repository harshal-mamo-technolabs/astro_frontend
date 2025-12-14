import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Check from "../assets/check.png";
const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate("/home");
    }, 2000);

    return () => clearTimeout(redirectTimeout);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#081132]">
      <img src={Check} style={{ height: "200px" }} />
      <h1 className="text-3xl font-bold text-green-500 mb-4">Payment Done!</h1>
      <p className="text-lg text-white">Redirecting to home page...</p>
    </div>
  );
};

export default PaymentSuccessPage;
