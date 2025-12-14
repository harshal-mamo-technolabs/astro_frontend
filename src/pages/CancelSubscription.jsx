import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const CancelSubscriptionPage = () => {
  const navigate = useNavigate();
  const handleCancelSubs = async () => {
    
  };

  return (
    <div className="min-h-screen bg-custom-gradient text-white">
      <div className="p-8">
        <div className="flex gap-3 w-full text-2xl lg:text-3xl p-3   text-white">
          <ArrowLeftOutlined
            className="lg:mt-2 mt-2  cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <div className="flex justify-center w-full">
            <button onClick={handleCancelSubs} className="p-3 bg-red-600 cursor">Cancel Subscription</button>
          </div>
        </div>
        <section className="mb-6 text-center text-xl mt-10">
          <p>
            We`re sorry to see you go. If you wish to cancel your subscription,
            please follow the instructions below.
          </p>
        </section>

        <div className="lg:ms-20 ms-10 mt-10">
          <section className="mb-6">
            <h2 className="text-2xl  mb-3">Cancellation Process</h2>
            <p className="text-lg">
              {" "}
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam,
              ut!
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl  mb-3">Prorated Refund</h2>
            <p className="text-lg">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis quasi alias nihil accusamus praesentium mollitia!
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl  mb-3">Contact Us</h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis quasi alias nihil accusamus praesentium mollitia!
              <Link
                to="/home/contact"
                className="underline hover:text-blue-500"
              >
                contact us
              </Link>{" "}
              for assistance.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CancelSubscriptionPage;
