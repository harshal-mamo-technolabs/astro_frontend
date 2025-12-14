import { useState, useEffect } from "react";
import { useProfile } from "../../context/Profile";
import Stripe from "../../assets/Stripe.png";
import axios from "axios";
import { Spin, message } from "antd";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_KEY
);
const AddCardDetail = () => {
  const { updateLoading, setUpdateLoading } = useProfile();
  const location = useLocation();
  const { selectedCard } = location.state || {};
  console.log(selectedCard, "card");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [filter, setFilter] = useState("visa");
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentList, setPaymentList] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (paymentList?.defaultPaymentMethodId) {
      setSelectedMethod(paymentList?.defaultPaymentMethodId);
    }
  }, [paymentList?.defaultPaymentMethodId]);

  const handleSelectMethod = (methodId) => {
    setSelectedMethod(methodId);
  };
  const fetchPaymentList = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}stripe/list-payment-methods`, {
        withCredentials: true,
      })
      .then((res) => {
        setLoading(false);
        setPaymentList(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPaymentList();
  }, [updateLoading]);
  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (elements == null) {
        return;
      }

      // Trigger form validation and wallet collection
      const { error: submitError } = await elements.submit();
      if (submitError) {
        // Show error to your customer
        setErrorMessage(submitError.message);
        return;
      }

      const { error } = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${import.meta.env.VITE_RETURN_URL}return`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
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
            Pay
          </button>
        </div>

        {/* Show error message to your customers */}
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    );
  };

  // if (!clientSecret) {
  //   return (
  //     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75 z-50">
  //       <Spin />
  //     </div>
  //   );
  // }
  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75 z-50">
        <Spin />
      </div>
    );
  }
  const fetchClientSecret = async () => {
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
    if (res.status == 400) {
      message.error("You already have a subscription plan", 6);
    } else {
      const data = await res.json();
      setClientSecret(data.client_secret);
      return data.client_secret;
    }
  };
  const handleUpdate = () => {
    setUpdateLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}stripe/update-default-payment-method`,
        {
          paymentMethodId: selectedMethod,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        message.success("Payment method changed successfully");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredPaymentMethods = () => {
    if (filter === "visa") {
      return paymentList?.paymentMethodsCard?.data?.filter(
        (method) => method.card.brand.toLowerCase() === "visa"
      );
    } else if (filter === "paypal") {
      return paymentList?.paymentMethodsPayPal?.data;
    }
    return [];
  };

  return (
    <div style={{ backgroundColor: "#141333" }} className=" min-h-screen">
      {clientSecret ? (
        <div className="flex justify-center relative top-3 items-center h-screen">
          <div className="w-[60%] bg-white p-4" style={{
            background: 'linear-gradient(180deg, rgb(210, 67, 209) 2%, rgb(105, 33, 182) 10%, rgb(12, 12, 12) 78%)',
            color: 'white'
          }}>
            {" "}
            <Elements stripe={stripePromise} options={{ clientSecret, appearance: {theme: 'night'} }}>
              <CheckoutForm />
            </Elements>
            <div className="flex justify-center">
              <img style={{width: 'fit-content', height: '30px'}} src={Stripe} />
            </div>
          </div>
        </div>
      ) : (
        <Spin spinning={loading} size="large">
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Payment Methods
            </h2>

            <Spin spinning={updateLoading} size="large">
              <div>
                <div className="mb-4">
                  <button
                    onClick={() => handleFilterChange("visa")}
                    className={`mr-4 px-4 py-2 rounded ${
                      filter === "visa"
                        ? "bg-[#7937a0] text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    Visa Cards
                  </button>
                  <button
                    onClick={() => handleFilterChange("paypal")}
                    className={`px-4 py-2 rounded ${
                      filter === "paypal"
                        ? "bg-[#7937a0] text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    PayPal
                  </button>
                </div>

                <div className={`flex justify-end`}>
                  <button
                    onClick={fetchClientSecret}
                    className={`bg-[#7937a0] hover:bg-[#7937a0] p-2 rounded-md text-white mt-4 m-2 ${
                      !selectedCard && "hidden"
                    }`}
                  >
                    Add New Payment Method
                  </button>
                </div>
              </div>

              {/* Payment Methods Section */}
              <div className="space-y-4">
                {/* Render filtered credit card methods */}
                {filter === "visa" &&
                  filteredPaymentMethods()?.map((method) => (
                    <div
                      key={method.id}
                      className={`bg-white rounded-lg p-4 shadow-md flex items-center ${
                        selectedMethod === method.id
                          ? "ring-4 ring-[#7937a0] shadow-2xl"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        id={method.id}
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedMethod === method.id}
                        onChange={() => handleSelectMethod(method.id)}
                        className="mr-2 cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="font-medium mr-2">
                            {method.card.brand}
                          </span>
                          <span className="text-gray-500 text-sm">
                            ending in {method.card.last4}
                          </span>
                          {paymentList.defaultPaymentMethodId === method.id && (
                            <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm w-[40%] justify-between">
                          <span className="mr-4">
                            Exp: {method.card.exp_month}/{method.card.exp_year}
                          </span>
                          <span>Funding: {method.card.funding}</span>
                          <span>Country: {method.card.country}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* Render filtered PayPal methods */}
                {filter === "paypal" &&
                  filteredPaymentMethods()?.map((method) => (
                    <div
                      key={method.id}
                      className={`bg-white rounded-lg p-4 shadow-md flex items-center ${
                        selectedMethod === method.id
                          ? "ring-2 ring-[#7937a0]"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        id={method.id}
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedMethod === method.id}
                        onChange={() => handleSelectMethod(method.id)}
                        className="mr-2 cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="font-medium">PayPal</span>
                          {paymentList.defaultPaymentMethodId === method.id && (
                            <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm w-[50%] justify-between">
                          <span>Country: {method.paypal.country}</span>
                          <span>Payer ID: {method.paypal.payer_id}</span>
                          <span className="text-gray-500 text-sm">
                            Payer Email: {method.paypal.payer_email}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Spin>
            {/* Filter Buttons */}

            {/* Update Button */}
            <div className="mt-8">
              <button
                onClick={handleUpdate}
                disabled={!selectedMethod}
                className={`bg-[#7937a0] hover:bg-[#7937a0] text-white font-bold py-2 px-4 rounded ${
                  !selectedMethod ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Update
              </button>
            </div>
          </div>
        </Spin>
      )}
    </div>
  );
};

export default AddCardDetail;
