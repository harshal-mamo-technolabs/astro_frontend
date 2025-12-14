import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const MoneyBackPolicy = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-custom-gradient text-white">
      <div className="p-8">
        <div className="flex gap-3 w-full text-2xl lg:text-3xl p-3  text-white">
          <ArrowLeftOutlined
            className="lg:mt-2 mt-2  cursor-pointer "
            onClick={() => navigate(-1)}
          />
          <div className="flex justify-center w-full ">
            <h2>Money Back Policy</h2>
          </div>
        </div>
        <div className="lg:ms-20 ms-10 mt-10">
          <section className="mb-6">
            <h2 className="text-2xl  mb-3">1. Eligibility</h2>
            <p className="text-lg">
              Our money back guarantee is applicable to customers who meet the
              specified criteria outlined in this policy.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl  mb-3">2. Duration</h2>
            <p className="text-lg">
              The money back guarantee is valid for a specific duration after
              the purchase date. Please check the terms of your purchase for
              details.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl  mb-3">3. Refund Process</h2>
            <p className="text-lg">
              To initiate a refund, please follow the instructions provided in
              our refund process. Refunds are typically processed within a
              specified timeframe.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl  mb-3">4. Exclusions</h2>
            <p className="text-lg">
              Certain products or services may be excluded from the money back
              guarantee. Please review the terms and conditions of your purchase
              for any exclusions.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl  mb-3">5. Contact Us</h2>
            <p className="text-lg">
              If you have any questions or concerns regarding our money back
              policy, feel free to{" "}
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

export default MoneyBackPolicy;
