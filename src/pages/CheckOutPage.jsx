import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutPage = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://your-website.com/checkout/success", // Update with your success URL
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log("Payment successful!");
    }
  };

  if (!clientSecret) {
    return <div>Missing client secret</div>;
  }

  const options = {
    clientSecret: clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button type="submit" disabled={!stripe}>Submit Payment</button>
      </form>
    </Elements>
  );
};

export default CheckoutPage;
