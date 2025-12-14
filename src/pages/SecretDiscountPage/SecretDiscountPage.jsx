import { useContext, useEffect, useState } from "react";
import styles from "./SecretDiscountPage.module.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import { TimeContext, calculateTimeLeft } from "../../context/TimerContext";
import Natal from "../../assets/natalimg.png";
import present from "../../assets/present.png";
import { message } from "antd";

const SecretDiscountPage = ({ onClose }) => {
  const { expirationTime, setExpirationTime, timeLeft, setTimeLeft } =
    useContext(TimeContext);
  const expirationTimeInMinutes = 1;
  const [couponDetails, setCouponDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlPlan = searchParams.get('plan');
  const urlDiscount = searchParams.get('discount');

  useEffect(() => {
    const fetchLatestCoupon = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}coupon/latest?profile=false`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include"
          }
        );

        const result = await response.json();
        if (result.success && result.coupon) {
          setCouponDetails(result.coupon);
        }
      } catch (error) {
        console.error("Error fetching coupon:", error);
      }
    };

    fetchLatestCoupon();
  }, []);

  const handleApplyDiscount = async () => {
    if (!couponDetails) {
      message.error("No discount available at the moment.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}subscriptions/apply-coupon?profile=false&coupon=${couponDetails.couponCode}`,
        {
          method: "POST",
          credentials: "include"
        }
      );

      const result = await response.json();
      
      if (response.status === 200 && result.success) {
        // Success case - coupon applied or already applied
        message.success("Discount applied successfully!");
        // Redirect to secretDiscountApplied with the same parameters from URL
        navigate(`/secretDiscountApplied?plan=${urlPlan || 'STARTER'}&discount=${urlDiscount || couponDetails.percentage}`);
      } else if (response.status === 400) {
        // Bad request cases
        if (result.msg?.includes("Invalid or inactive")) {
          message.error("This discount code is no longer valid.");
        } else if (result.msg?.includes("not valid for this plan")) {
          message.error("This discount is not available for your current plan.");
        } else if (result.msg?.includes("Missing user session")) {
          message.error("Please log in again to apply the discount.");
        } else {
          message.error(result.msg || "Could not apply discount. Please try again.");
        }
      } else if (response.status === 401) {
        // Authentication error
        message.error("Please log in again to apply the discount.");
      } else if (response.status === 404) {
        // No active subscription
        message.error("No active subscription found. Please subscribe to a plan first.");
      } else {
        // Other errors
        message.error(result.msg || "Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error applying discount:", error);
      message.error("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (expirationTime === null) {
      const newExpirationTime =
        new Date().getTime() + expirationTimeInMinutes * 60 * 1000;
      localStorage.setItem("expirationTime", newExpirationTime.toString());
      setExpirationTime(newExpirationTime);
    }
    const interval = setInterval(() => {
      if (
        expirationTime !== null &&
        expirationTime - new Date().getTime() <= 0
      ) {
        clearInterval(interval);
        localStorage.removeItem("expirationTime");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expirationTime]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(expirationTime));
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className={styles.pageWrapper}>
      <Link to="/settings/plans/cancelplan" onClick={onClose} className={styles.wrapperExitBtn}>
        <MdOutlineClose className={styles.exitBtn} />
      </Link>
      <div className={styles.imageHeader}>
        <img src={Natal} alt="" />
      </div>
      <div className={styles.box}>
        <div className={styles.boxImg}>
          <img src={present} alt="" />
        </div>
        <div className={styles.boxText}>
          <div className={styles.timeLeft}>
            {timeLeft && (timeLeft.minutes > 0 || timeLeft.seconds > 0) ? (
              <p>
                Discount Expires In:{" "}
                <span className={styles.timer}>
                  {timeLeft?.minutes}:{timeLeft?.seconds}{" "}
                </span>
              </p>
            ) : (
              " "
            )}
          </div>
          <p className={styles.save}>Save </p>
          <span className={styles.percent}>{couponDetails?.percentage || 0}%</span>
          <p>
            This discount will be applied to your current plan <br />
            and will take effect from your next billing cycle
          </p>
        </div>
        <div className={styles.wrapperBtn}>
          <button 
            className={styles.getSecretBtn} 
            onClick={handleApplyDiscount}
            disabled={loading}
          >
            {loading ? "Applying..." : "Get secret discount"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecretDiscountPage;
