import { useContext, useEffect, useState, useMemo } from "react";
import styles from "./PlansPage.module.scss";
import Cards from "../../sections/Cards/Cards";
import SubFooter from "../../components/SubFooter/SubFooter";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import { CardContext } from "../../context/CardContext";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import axios from "axios";
import { useProfile } from "../../context/Profile";
import { Button } from "antd";
import { loadStripe } from '@stripe/stripe-js';
import { message } from 'antd';
import { useTranslatedText, useTranslatedTexts } from "../../hooks/useTranslatedText";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const PlansPage = ({ subscriptionInfo }) => {
  const { selectedCard } = useContext(CardContext);
  const { paymentList, setPaymentList } = useProfile();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Translations
  const plansPageTexts = useMemo(() => [
    "Get full access on all our premium reports and readings",
    "Your currently on {plan} plan",
    "CONTINUE",
    "You can cancel anytime. Total charge 119,92€. Subscriptions is auto renewable until cancelation.",
    "You can cancel any time. Total charge 2.99€. After 3 days trial you will be charged 19.99 weekly, billed monthly. Subscriptions is auto renewable until cancelation.",
    "You can cancel any time. Total charge 167.88€. Subscriptions is auto renewable until cancelation.",
    "Change Payments Details",
    "Consider upgrading or downgrading your current plan",
    "Plan purchased successfully!",
    "Subscription failed. Try again.",
    "Payment failed. Please try again.",
    "3D Secure authentication failed."
  ], []);

  const [subtitleText, currentPlanText, continueButtonText, subscriptionText1, subscriptionText2, subscriptionText3, changePaymentText, upgradeDowngradeText, planPurchasedText, subscriptionFailedText, paymentFailedText, authFailedText] = useTranslatedTexts(plansPageTexts);

  const handleContinue = async () => {
    if (paymentList?.defaultPaymentMethodId) {
      setLoading(true);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}stripe/pay-default-payment-method`,
          {
            lookup_key: selectedCard.lookup_key,
          },
          { withCredentials: true }
        );

        if(res.status === 200 && res.success === false && res.currentPlan && res.msg === 'Consider upgrading or downgrading your current plan.'){
          message.error(upgradeDowngradeText, 6);
          navigate("/home");
        }

        const data = res.data;

        if (data.requiresAction && data.client_secret) {
          const stripe = await stripePromise;
          const result = await stripe.confirmCardPayment(data.client_secret);

          if (result.error) {
            message.error(result.error.message || authFailedText);
          } else {
            navigate("/success");
            message.success(planPurchasedText);
          }
        } else if (data.success) {
          navigate("/success");
          message.success(planPurchasedText);
        } else {
          message.error(data.msg || subscriptionFailedText);
        }
      } catch (err) {
        console.error("Error in handleContinue:", err);
        message.error(paymentFailedText);
      } finally {
        setLoading(false);
      }
    } else {
      navigate("/subscription/pay", { state: { selectedCard } });
    }
  };

  const fetchPaymentList = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}stripe/list-payment-methods`, {
        withCredentials: true,
      })
      .then((res) => {
        setPaymentList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePayment = () => {
    navigate("/subscription/changePayment", { state: { selectedCard } });
  };

  useEffect(() => {
    fetchPaymentList();
  }, []);
  return (
    <div
      className={`${styles.planPage} min-h-screen`}
      style={{
        backgroundColor: "#141333",
      }}
    >
      <BackButton onClick={() => navigate("/home")} />
      <ImageSlider />
      <h2 className={styles.subtitle}>
        {subtitleText}
      </h2>
      <h2 className={`${styles.subtitle} text-sm relative bottom-2`}>
        {subscriptionInfo &&
          currentPlanText.replace("{plan}", subscriptionInfo?.type.toLowerCase())}
      </h2>
      <Cards premium={subscriptionInfo} loading={loading} />
      <div className={`${styles.buttonWrapper} `}>
        <button
          id="continue"
          type="button"
          onClick={handleContinue}
          className={`${styles.pulse} ${subscriptionInfo?.type === "GOLD" && "hidden"
            }`}
        >
          {continueButtonText}
        </button>
      </div>
      {selectedCard?.id === 2 && (
        <div
          className={`${styles.subscriptionWrapper} ${subscriptionInfo?.type === "GOLD" && "hidden"
            }`}
        >
          <p className={styles.subscription}>
            {subscriptionText1}
          </p>
        </div>
      )}
      {selectedCard?.id === 1 && (
        <div
          className={`${styles.subscriptionWrapper} ${subscriptionInfo?.type === "GOLD" && "hidden"
            }`}
        >
          <p className={styles.subscription}>
            {subscriptionText2}
          </p>
        </div>
      )}
      {selectedCard?.id === 3 && (
        <div
          className={`${styles.subscriptionWrapper} ${subscriptionInfo?.type === "GOLD" && "hidden"
            }`}
        >
          <p className={styles.subscription}>
            {subscriptionText3}
          </p>
        </div>
      )}{" "}
      <div className="flex justify-center m-1">
        <Button
          type="button"
          onClick={handleChangePayment}
          className={`bg-[#7937a0] w-fit p-1 rounded-md text-white ${!paymentList?.defaultPaymentMethodId && "hidden"
            }`}
        >
          <span className="text-white">{changePaymentText}</span>
        </Button>
      </div>
      <SubFooter subscriptionInfo={subscriptionInfo} />
    </div>
  );
};

export default PlansPage;
