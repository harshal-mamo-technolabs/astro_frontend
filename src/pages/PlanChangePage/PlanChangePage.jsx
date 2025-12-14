import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { CardContext } from "../../context/CardContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const PlanChangePage = () => {
  const { selectedCard } = useContext(CardContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePlanChange = async () => {
    if (!selectedCard?.type) {
      message.error("Please select a plan first");
      return;
    }

    setLoading(true);
    try {
      console.log("Sending upgrade request...");

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}subscriptions/upgrade?plan=GOLD`,
        {},
        { withCredentials: true }
      );

      const { clientSecret, success, msg } = response.data;
      console.log("Upgrade response:", response.data);

      const stripe = await stripePromise;

      if (!stripe) {
        console.error("Stripe.js failed to load");
        message.error("Stripe failed to initialize.");
        return;
      }

      // If backend says success but still gives clientSecret → warn
      if (success && clientSecret) {
        console.warn("⚠️ Backend returned success=true but also clientSecret. Double-check backend logic.");
      }

      // Case 1: Payment still required (SCA or confirmation)
      if (!success && clientSecret) {
        console.log("Payment requires confirmation — calling Stripe.confirmCardPayment...");

        const result = await stripe.confirmCardPayment(clientSecret);
        console.log("Stripe confirmCardPayment result:", result);

        if (result.error) {
          console.error("Stripe error:", result.error);
          message.error(result.error.message || "3D Secure authentication failed");
          return;
        }

        const status = result.paymentIntent?.status;
        console.log("PaymentIntent status:", status);

        if (status === "succeeded") {
          message.success("Plan changed successfully");
          navigate("/success");
        } else if (status === "requires_payment_method") {
          message.error("Payment failed. Please try a different card.");
        } else if (status === "requires_action") {
          message.error("Further authentication required. Please try again.");
        } else if (status === "canceled") {
          message.error("Payment was canceled.");
        } else {
          message.error(`Unhandled payment status: ${status}`);
        }

        return;
      }

      // Case 2: No payment required, or already succeeded
      console.log("No payment required or already completed. Navigating to success page.");
      message.success(msg || "Plan changed successfully");
      navigate("/success");
    } catch (error) {
      console.error("Error changing plan:", error);
      message.error(error.response?.data?.msg || "Failed to change plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Change Subscription Plan</h2>

      <p>Selected Plan: <strong>THREE_PROFILE</strong></p>

      <button
        onClick={handlePlanChange}
        disabled={loading}
        style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}
      >
        {loading ? "Processing..." : "Change Plan"}
      </button>
    </div>
  );
};

export default PlanChangePage;
