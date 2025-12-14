import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const SubscriptionTerms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-custom-gradient text-white">
      <div className=" p-8 ">
        <div className="flex gap-3 w-full text-2xl lg:text-3xl p-3  cursor-pointer text-white">
          <ArrowLeftOutlined
            className="lg:mt-2 mt-2 "
            onClick={() => navigate(-1)}
          />
          <div className="flex justify-center w-full">
            <h2>Membership Terms</h2>
          </div>
        </div>
        <div className="lg:ms-20 ms-10 mt-10">
          <section className="mb-6">
            <h2 className="text-2xl mb-3">1. Subscription Plans</h2>
            <p className="text-lg">
              We offer various subscription plans for our astrology services.
              Each plan comes with its own set of features and duration.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl mb-3">2. Billing Cycle</h2>
            <p className="text-lg">
              Subscriptions are billed on a recurring basis. You will be charged
              automatically at the beginning of each billing cycle.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl mb-3">3. Payment Methods</h2>
            <p className="text-lg">
              We accept payments through credit/debit cards and online payment
              platforms for subscription payments.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl mb-3">4. Cancellation</h2>
            <p className="text-lg">
              You can cancel your subscription at any time. However, please note
              that cancellation may not result in a prorated refund. click to
              cancel subscription
              <Link to={"/home/cancelsubscription"} className=" border-b-2">
                {" "}
                Cancel subscription
              </Link>
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl mb-3">5. Refund Policy</h2>
            <p className="text-lg">
              Refund policies for subscription plans are outlined in our general
              refund policy. Please review it for more details.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl mb-3">6. Contact Us</h2>
            <p className="text-lg">
              If you have any questions or concerns regarding subscriptions,
              feel free to{" "}
              <Link
                to="/home/contact"
                className="underline hover:text-blue-500"
              >
                contact us
              </Link>{" "}
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTerms;
