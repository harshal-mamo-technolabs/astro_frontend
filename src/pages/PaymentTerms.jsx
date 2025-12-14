import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const PaymentTerms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-custom-gradient text-white">
      <div className=" p-8  ">
        <div className="flex gap-3 w-full text-2xl lg:text-3xl p-3    text-white">
          <ArrowLeftOutlined
            className="lg:mt-2 mt-2 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <div className="flex justify-center w-full">
            <h2>Payment Terms</h2>
          </div>
        </div>
        <div className="lg:ms-20 ms-10 mt-10">
          <section className="mb-6">
            <h2 className="text-2xl mb-3">1. Payment Methods</h2>
            <p className="text-lg">
              We accept payments through credit/debit cards and online payment
              platforms.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl  mb-3">2. Payment Processing</h2>
            <p className="text-lg">
              Payments are processed securely, and your financial information is
              encrypted.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl  mb-3">3. Subscription Plans</h2>
            <p className="text-lg">
              Our astrology services may have subscription plans. Please review
              the details before making a purchase.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl mb-3">4. Refund Policy</h2>
            <p className="text-lg">
              Refunds are issued in accordance with our refund policy. Please
              refer to the policy for more information.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl mb-3">5. Contact Us</h2>
            <p className="text-lg">
              If you have any questions or concerns regarding payments, feel
              free to{" "}
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

export default PaymentTerms;
