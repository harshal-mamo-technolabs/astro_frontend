import styles from "./Footer.module.scss";
import { useTranslatedText } from "../../hooks/useTranslatedText";

const Footer = ({subscriptionInfo}) => {
  const footerText = useTranslatedText("Terms of Services | Privacy Policy | Membership Terms");
  
  return (
    <div className={`${styles.footer} ${
      subscriptionInfo?.type === "GOLD" && "absolute top-[92%]"
    } `}>
      <p>{footerText}</p>
    </div>
  );
};

export default Footer;
