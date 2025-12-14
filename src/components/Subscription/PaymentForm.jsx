// import React from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     // Use the token to create a charge or a customer
//     const { token, error } = await stripe.createToken(cardElement);

//     if (error) {
//       console.error(error);
//     } else {
//       console.log(token);
//       // Send the token to your server for further processing
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Card details
//         <CardElement />
//       </label>
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// };

// export default PaymentForm;


import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

const Checkout = () => {
  const [showCheckout, setShowCheckout] = useState(false);

  const handleToken = (token) => {
    // You can handle the token here (send it to your server for payment processing)
    console.log(token);
    // Optionally, close the checkout form after handling the token
    setShowCheckout(false);
  };

  return (
    <div className="text-center">
      <h1>Checkout Page</h1>
      {showCheckout ? (
        <StripeCheckout
          token={handleToken}
          stripeKey="your_stripe_publishable_key"
          name="Your Company"
          description="Awesome Product"
          amount={1000} // Amount in cents
          currency="USD"
          billingAddress
          shippingAddress
        >
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Pay with Card
          </button>
        </StripeCheckout>
      ) : (
        <button
          onClick={() => setShowCheckout(true)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Open Checkout
        </button>
      )}
    </div>
  );
};

export default Checkout;

