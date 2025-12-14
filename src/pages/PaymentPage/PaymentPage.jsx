import { useContext, useEffect, useState, useMemo } from "react";
import styles from "./PaymentPage.module.scss";
import { CardContext } from "../../context/CardContext";
import { useNavigate } from "react-router-dom";
import SecretDiscountPage from "../SecretDiscountPage/SecretDiscountPage";
import { TimeContext, calculateTimeLeft } from "../../context/TimerContext";
import BackButton from "../../components/BackButton/BackButton";
import TermsAndConditions from "../../components/TermsAndConditions/TermsAndConditions";
import Natal from "../../assets/natalimg.png";
import Card from "../../components/Card/Card";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useTranslatedText } from "../../hooks/useTranslatedText";

const PaymentPage = () => {
  const { selectedCard } = useContext(CardContext);
  console.log(selectedCard, "new caed");
  const { timeLeft, setTimeLeft, expirationTime } = useContext(TimeContext);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Translations
  const continueButtonText = useTranslatedText("Continue");
  const starterPlanText = useTranslatedText("Your Starter membership will be automatically renewed. The 3 days trial membership is extended by another month (€89.94).");
  const premiumPlanText = useTranslatedText("Your Premium membership will be automatically renewed. The 2 month membership is extended by another 2 months (€119.92).");
  const goldPlanText = useTranslatedText("Your Gold membership will be automatically renewed. The 3 month membership is extended by another 3 months (€167.88).");

  const handleContinue = async () => {
    navigate("/subscription/pay", { state: { selectedCard } });

    // let lookup_key;
    // switch (selectedCard.name) {
    //   case "STARTER":
    //     lookup_key = "zodiya_trial_test";
    //     break;
    //   case "PREMIUM":
    //     lookup_key = "zodiya_premium_test";
    //     break;
    //   case "GOLD":
    //     lookup_key = "zodiya_gold_test";
    //     break;
    //   default:
    //     return;
    // }
    // setLoading(true);
    // try {
    //   const response = await axios.post(
    //     `${import.meta.env.VITE_BASE_URL}stripe/create-checkout-session`,
    //     {
    //       lookup_key,
    //     },
    //     {
    //       withCredentials: true,
    //     }
    //   );

    //   if (response.data) {
    //     navigate(`/checkout/${response.data.client_secret}`);
    //   }
    // } catch (error) {
    //   console.error("Error creating checkout session:", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      if (showPopup) {
        setTimeLeft(calculateTimeLeft(expirationTime));
      }
    }, 1000);

    const countdownTimer = setTimeout(() => {
      if (timeLeft && timeLeft.minutes <= 0 && timeLeft.seconds <= 0) {
        setShowPopup(false);
      }
    }, 1000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(countdownTimer);
    };
  }, [showPopup, expirationTime, timeLeft]);

  const togglePopup = () => {
    if (timeLeft?.minutes === 0 && timeLeft?.seconds === 0) {
      setShowPopup(false);
      navigate(-1);
    } else {
      setShowPopup(!showPopup);
    }
  };

  return (
    <div className={"bg-[#141333] min-h-screen"}>
      <div
        className={`${styles.overlay} ${showPopup ? styles.show : ""}`}
      ></div>
      <div className={styles.headerWrapper}>
        <BackButton onClick={togglePopup} />

        {showPopup && (
          <SecretDiscountPage onClose={() => setShowPopup(false)} />
        )}
        <div className={styles.header}>
          <div className="flex  justify-center">
            <img src={Natal} alt="" style={{ height: "100px" }} />
          </div>
        </div>
      </div>
      {selectedCard?.name === "STARTER" && (
        <TermsAndConditions planText={starterPlanText} />
      )}

      {selectedCard?.name === "PREMIUM" && (
        <TermsAndConditions planText={premiumPlanText} />
      )}

      {selectedCard?.name === "GOLD" && (
        <TermsAndConditions planText={goldPlanText} />
      )}

      <div className="mt-4 flex flex-col items-center justify-center align-middle">
        <Card data={selectedCard} />
      </div>

      <div className="flex justify-center">
        <Spin
          className="bg-transparent"
          spinning={loading}
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 30,
                color: "white",
                fontWeight: "bold",
              }}
              spin
            />
          }
        >
          <button
            id="continue"
            type="button"
            className="bg-[#7937a0] text-white p-2 text-lg font-medium rounded-md m-2"
            onClick={handleContinue}
          >
            {continueButtonText}
          </button>{" "}
        </Spin>
      </div>
    </div>
  );
};

export default PaymentPage;
