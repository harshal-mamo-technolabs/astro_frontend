import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import present from "../../assets/present.png";
import styles from "./SecretDiscountAppliedPage.module.scss";
import Natal from "../../assets/natalimg.png";

export default function SecretDiscountAppliedPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const percentage = searchParams.get('discount') ?? state?.percentage ?? 0;
  const planParam = searchParams.get('plan') ?? state?.planName ?? "STARTER";
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  // Map plan parameter to display text
  const getPlanDisplayText = (plan) => {
    switch(plan) {
      case 'STARTER':
        return 'Starter Plan';
      case 'TRIAL':
        return 'Trial Plan';
      case 'PREMIUM':
        return 'Premium Plan';
      case 'GOLD':
        return 'Gold Plan';
      default:
        return 'Starter Plan';
    }
  };

  // Get short name for welcome message
  const getShortName = (plan) => {
    switch(plan) {
      case 'STARTER':
        return 'Starter';
      case 'TRIAL':
        return 'Trial';
      case 'PREMIUM':
        return 'Premium';
      case 'GOLD':
        return 'Gold';
      default:
        return 'Starter';
    }
  };

  const planName = getPlanDisplayText(planParam);
  const shortName = getShortName(planParam);

  return (
    <div className={styles.pageWrapper}>
      <Link to="/settings/plans" className={styles.backBtn}>
        <MdArrowBack />
      </Link>

      <div className={styles.imageHeader}>
        <img src={Natal} alt="Natal illustration" />
      </div>

      <div className={styles.content}>
        <p className={styles.successText}>Secret discount applied!</p>
        <p className={styles.discountText}>
          <span className={styles.percent}>{percentage}%</span> on {planName}
        </p>
        <h1 className={styles.welcome}>Welcome to Zodiya {shortName}</h1>
      </div>

      <div className={styles.footerText}>
        <p>
          The general&nbsp;
          <Link to="/terms" className={styles.link}>
            terms and conditions
          </Link>
          &nbsp;also apply with regard to data protection. If you as a {shortName}
          wish to continue, no further action is required from you. Your
          {shortName} membership will be automatically renewed.
        </p>
      </div>
    </div>
  );
}
