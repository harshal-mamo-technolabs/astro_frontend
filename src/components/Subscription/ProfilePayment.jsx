import { useState, useEffect, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { Spin, message } from "antd";
import { useProfile } from "../../context/Profile";
import Stripe from "../../assets/Stripe.png";
import { useTranslatedText, useTranslatedTexts } from "../../hooks/useTranslatedText";
import { useTranslation } from "../../context/TranslationContext";
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_KEY
);

const ProfilePay = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedProfile } = location.state;
  const { setPayprofile } = useProfile();
  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const { currentLanguage } = useTranslation();
  console.log(selectedProfile, "selected profile");

  // Translations
  const profilePaymentTexts = useMemo(() => [
    "Your purchasing {profile} Subscription",
    "Existing Payment Methods:",
    "No payment methods found",
    "ending in",
    "Add New Payment Method",
    "Pay",
    "Pay to Zodiya",
    "Consider upgrading or downgrading your current plan",
    "you already have profile subscription",
    "An error occured"
  ], []);

  const [purchasingText, existingPaymentMethodsText, noPaymentMethodsText, endingInText, addNewPaymentMethodText, payButtonText, payToZodiyaText, upgradeDowngradeText, alreadyHaveProfileSubscriptionText, errorOccurredText] = useTranslatedTexts(profilePaymentTexts);

  // Translate the description text
  const translatedDesc = useTranslatedText(selectedProfile?.desc || "");

  const fetchPaymentMethods = async () => {
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
    console.log(paymentData.paymentMethods.data, "payment data");
    setPaymentMethods(paymentData.paymentMethods.data);
  };

  const payWithPaymentMethod = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}stripe/pay-with-payment-method`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lookup_key: selectedProfile.lookup_key,
          paymentMethodID: paymentMethods[0].id,
        }),
        credentials: "include",
      }
    );
    const data = await res.json();
    if (data.success) {
      navigate("/return");
    } else {
      message.error(errorOccurredText);
    }
  };

  const fetchClientSecret = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}stripe/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lookup_key: selectedProfile.lookup_key,
          }),
          credentials: "include",
        }
      );

      if(res?.status === 200 && res?.success === false && res?.currentPlan && res?.msg === 'Consider upgrading or downgrading your current plan.'){
        message.error(upgradeDowngradeText, 6);
        navigate("/home");
      }

      if (!res.ok) {
        throw new Error("Failed to fetch client secret");
      }

      const data = await res.json();
      setClientSecret(data.client_secret);
      setLoading(false);
    } catch (error) {
      message.info(alreadyHaveProfileSubscriptionText, 3);
      navigate("/home");

      return null;
    }
  };

  // const fetchClientSecret = async () => {
  //   const res = await fetch(
  //     `${import.meta.env.VITE_BASE_URL}stripe/create-checkout-session`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         lookup_key: selectedProfile.lookup_key,
  //       }),
  //       credentials: "include",
  //     }
  //   );

  //   const data = await res.json();
  //   return data.client_secret;
  // };

  useEffect(() => {
    setLoading(true);
    fetchPaymentMethods();
    setLoading(false);
    // fetchClientSecret().then((clientSecret) => {
    //   console.log(clientSecret);
    //   setClientSecret(clientSecret);
    // });
  }, []);

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (elements == null) {
        return;
      }

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
              name: "Your Customer Name",
              address: {
                line1: "123 Street Name",
                city: "Your City",
                country: "IN", // <-- REQUIRED if Indian card
                postal_code: "123456"
              }
            }
          }
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setPayprofile(false);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <div className="flex justify-center">
            <button
              type="submit"
              disabled={!stripe || !elements}
              className="bg-[#7937a0] hover:bg-[#7937a0] p-2 rounded font-bold text-white w-[40%] m-2"
            >
              {payButtonText}
            </button>
        </div>

        {errorMessage && <div>{errorMessage}</div>}
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
  // if (!clientSecret) {
  //   return (
  //     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75 z-50">
  //       <Spin />
  //     </div>
  //   );
  // }

  return (
    <div
      className=" min-h-screen"
      style={{
        backgroundColor: "#141333",
      }}
    >
      <div className="flex justify-center items-center align-middle relative top-2 h-screen">
        <div className="flex justify-center bg-white rounded-md w-full px-4 md:px-6 lg:w-fit lg:px-0" style={{
          background: 'linear-gradient(180deg, rgb(210, 67, 209) 2%, rgb(105, 33, 182) 10%, rgb(12, 12, 12) 78%)',
          color: 'white'
        }}>
          <div className=" shadow-lg m-2 p-2 w-full lg:w-[700px] ">
            <h2 className="text-center m-2 text-2xl">
              {purchasingText.replace("{profile}", selectedProfile.profile)}
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
                {paymentMethods.map((method) => (
                  <div key={method.id} className="border-2 p-1 w-fit rounded-md">
                    <input
                      type="radio"
                      id={method.id}
                      name="paymentMethod"
                      value={method.id}
                    />{" "}
                    {method.type} {method.card.brand} {endingInText} **** **** ****{" "}
                    {method.card.last4}
                  </div>
                ))}
                <button
                  onClick={fetchClientSecret}
                  className="bg-[#7937a0] hover:bg-[#7937a0] p-1 rounded-md text-white mt-4"
                >
                  {addNewPaymentMethodText}
                </button>
              </div>
            )}
            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night' }, locale: currentLanguage === "ro" ? "ro" : "en" }}>
                <CheckoutForm />
              </Elements>
            )}
            <p className="text-center m-2 text-gray-500 text-sm">
              {translatedDesc}
            </p>
            {!clientSecret && paymentMethods.length > 0 && (
              <button
                className="bg-green-600 hover:bg-green-500 p-2 rounded font-bold text-white w-[40%] m-2"
                onClick={payWithPaymentMethod}
              >
                {payToZodiyaText}
              </button>
            )}{" "}
            <img style={{ width: 'fit-content', height: '30px' }} src={Stripe} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePay;
