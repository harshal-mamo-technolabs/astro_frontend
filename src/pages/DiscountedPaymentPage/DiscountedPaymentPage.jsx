import  { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DiscountedPaymentPage.module.scss";
import { TimeContext, calculateTimeLeft } from "../../context/TimerContext";
import BackButton from "../../components/BackButton/BackButton";
import TermsAndConditions from "../../components/TermsAndConditions/TermsAndConditions";
import  Natal from "../../assets/natalimg.png"

const DiscountedPaymentPage = () => {
  const { expirationTime, timeLeft, setTimeLeft } = useContext(TimeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(expirationTime));
    }, 1000);
    return () => clearTimeout(timer);
  });

  const navigateBack = () => {
    navigate(-1);
  };
  return (
    <div className={"bg-[#141333] min-h-screen"} style={{color:"white", textAlign:"center"}}>
      <div className={styles.headerWrapper}>
        <BackButton onClick={navigateBack} />
        <div className={styles.header}>
          <div className="flex  justify-center">
            <img src={Natal} alt="" style={{
              height:"100px"
            }}/>
          </div>
          {timeLeft && (timeLeft.minutes > 0 || timeLeft.seconds > 0) ? (
            <div className={styles.headerText}>
              <p>Secret discount applied! </p>
              <p>
                <span className={styles.percent}> 50% </span>on 3 days trial
                plan
              </p>
              {timeLeft && (timeLeft.minutes > 0 || timeLeft.seconds > 0) ? (
                <p className={styles.timeLeft}>
                  Time left to grab this offer{" "}
                  <span className={styles.timer}>
                    {timeLeft?.minutes}:{timeLeft?.seconds}{" "}
                  </span>
                </p>
              ) : (
                " "
              )}{" "}
            </div>
          ) : (
            <div className={styles.headerText} style={{color:"white", textAlign:"center"}}>
              <p>
                Sorry, your secret discount has <span>expired</span>{" "}
              </p>
              <p>Your STARTER 3 days trial plan </p>
            </div>
          )}
        </div>
      </div>
      <TermsAndConditions
        planText="Your Starter membership will be automatically
          renewed. The 3 days trial membership is extended by another month (€
          89.94)."
      />
    </div>
  );
};

export default DiscountedPaymentPage;
