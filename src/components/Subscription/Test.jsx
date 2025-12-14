import { useState, useEffect, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "../../assets/Stripe.png";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { Spin, message } from "antd";
import { useTranslatedText, useTranslatedTexts } from "../../hooks/useTranslatedText";
import { useTranslation } from "../../context/TranslationContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const SubscriptionPay = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const location = useLocation();
  const { selectedCard } = location.state;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const { currentLanguage } = useTranslation();

  // Translations
  const paymentTexts = useMemo(() => [
    "You are Subscribing to Zodiya {plan} Plan",
    "Existing Payment Methods:",
    "No payment methods found",
    "Add New Payment Method",
    "Pay",
    "Pay to Zodiya",
    "Consider upgrading or downgrading your current plan",
    "You already have a subscription plan",
    "Something went wrong while initiating payment.",
    "Something went wrong while fetching payment methods.",
    "No payment method selected.",
    "An error occurred while processing payment",
    "By providing your card information, you allow Zodiya sandbox to charge your card for future payments in accordance with their terms.",
    "Secure Payments Powered by stripe",
    "Safe and Secure SSL Encrypted"
  ], []);

  const [subscribingText, existingPaymentMethodsText, noPaymentMethodsText, addNewPaymentMethodText, payButtonText, payToZodiyaText, upgradeDowngradeText, alreadyHaveSubscriptionText, paymentInitErrorText, fetchPaymentErrorText, noPaymentSelectedText, processingPaymentErrorText, cardInfoDisclaimerText, securePaymentsText, sslEncryptedText] = useTranslatedTexts(paymentTexts);

  const fetchClientSecret = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}stripe/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lookup_key: selectedCard.lookup_key,
        }),
        credentials: "include",
      }
    );

    // Parse the JSON exactly once:
    const data = await res.json();

    // If the backend indicates "consider upgrading/downgrading":
    if (res.status === 200 && data.success === false && data.currentPlan && data.msg === "Consider upgrading or downgrading your current plan.") {
      message.error(upgradeDowngradeText, 6);
      navigate("/home");
      return;
    }

    // If the backend returns a 400 status for "already have a subscription":
    if (res.status === 400) {
      message.error(alreadyHaveSubscriptionText, 6);
      navigate("/home");
      return;
    }

    // Otherwise, assume we have a valid client_secret and set it:
    if (res.status === 200 && data.client_secret) {
      setClientSecret(data.client_secret);
      return data.client_secret;
    }

    // Optional: handle any other unexpected status/code
    console.warn("Unexpected response from create-checkout-session:", res.status, data);
  } catch (err) {
    console.error("Error in fetchClientSecret:", err);
    message.error(paymentInitErrorText);
  }
};

  const fetchPaymentMethods = async () => {
    setLoading(true);
    try {
      const paymentRes = await fetch(
        `${import.meta.env.VITE_BASE_URL}stripe/list-payment-methods`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const paymentData = await paymentRes.json();
      if (
        paymentData &&
        paymentData.paymentMethods &&
        Array.isArray(paymentData.paymentMethods.data)
      ) {
        setPaymentMethods(paymentData.paymentMethods.data);
      } else {
        console.warn("Unexpected payment methods response:", paymentData);
      }
    } catch (err) {
      console.error("Failed to fetch payment methods:", err);
      message.error(fetchPaymentErrorText);
    }
    setLoading(false);
  };

  const payWithPaymentMethod = async () => {
    if (!paymentMethods.length) {
      message.error(noPaymentSelectedText, 6);
      return;
    }
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}stripe/pay-with-payment-method`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lookup_key: selectedCard.lookup_key,
          paymentMethodID: paymentMethods[0].id,
        }),
        credentials: "include",
      }
    );
    const data = await res.json();
    if (data.success) {
      navigate("/return");
    } else {
      message.error(processingPaymentErrorText, 6);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchPaymentMethods();
    })();
  }, []);

  useEffect(() => {
    // If payment methods have been fetched and none are found, fetch the client secret
    if (!loading && paymentMethods.length === 0) {
      fetchClientSecret();
    }
  }, [loading, paymentMethods]); // Depend on loading and paymentMethods state

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!elements || !stripe) return;

      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message);
        return;
      }

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${import.meta.env.VITE_RETURN_URL}return`,
          payment_method_data: {
            billing_details: {
              name: "Zodiya",
              address: {
                line1: "Zodiya HQ",
                city: "Mumbai",
                postal_code: "400001",
                country: "IN",
              },
            },
          },
        },
      });

      if (error) {
        console.error("Error during payment confirmation", error);
        setErrorMessage(error.message);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="w-full">
        <PaymentElement />
        <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={!stripe || !elements}
              className="bg-[#7937a0] hover:bg-[#7937a0] p-2 rounded font-bold text-white w-full md:w-[40%] m-0"
            >
              {payButtonText}
            </button>
        </div>
        {errorMessage && (
          <div className="text-center text-red-500 mt-2">{errorMessage}</div>
        )}
      </form>
    );
  };

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75 z-50">
        <Spin />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-700 to-purple-600 font-nunito-light text-white">
      {/* ⬇︎ EXACT DESKTOP CONTAINER: DO NOT CHANGE FOR ≥md ⬇︎ */}
      <div className="flex justify-center items-center relative top-2 h-screen">
        <div
          className="flex justify-center bg-white rounded-md w-full px-4 md:w-fit md:px-0"
          style={{
            background:
              "linear-gradient(180deg, rgb(210, 67, 209) 2%, rgb(105, 33, 182) 10%, rgb(12, 12, 12) 78%)",
            color: "white",
          }}
        >
          <div className="shadow-lg m-2 p-2 w-full md:w-[700px]">
            <h2 className="text-center m-2 text-2xl">
              {subscribingText.replace("{plan}", selectedCard.name)}
            </h2>

            {!clientSecret && (
              <div>
                {existingPaymentMethodsText}
                <br />
                {paymentMethods.length === 0 && (
                  <div>
                    {noPaymentMethodsText}
                    <br />
                  </div>
                )}
                <button
                  onClick={fetchClientSecret}
                  className="bg-[#7937a0] hover:bg-[#7937a0] p-1 rounded-md text-white mt-4"
                >
                  {addNewPaymentMethodText}
                </button>
              </div>
            )}

            {clientSecret && (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: { theme: "night" },
                  locale: currentLanguage === "ro" ? "ro" : "en",
                }}
              >
                <CheckoutForm />
              </Elements>
            )}

            <p className="text-center m-2 text-gray-500 text-sm">
              {selectedCard.description}
            </p>

            {!clientSecret && paymentMethods.length > 0 && (
              <button
                className="bg-green-600 hover:bg-green-500 p-2 rounded font-bold text-white w-full md:w-[40%] mt-4"
                onClick={payWithPaymentMethod}
              >
                {payToZodiyaText}
              </button>
            )}

            <div className="mt-4">
              <img
                src={Stripe}
                alt="Stripe Logo"
                style={{ width: "fit-content", height: "30px" }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* ⬆︎ END DESKTOP CONTAINER ⬆︎ */}
    </div>
  );
};

export default SubscriptionPay;
