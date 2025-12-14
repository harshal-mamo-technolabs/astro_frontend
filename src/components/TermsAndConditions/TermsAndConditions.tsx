import React from "react";
import styles from "./TermsAndConditions.module.scss";
import { useTranslatedText } from "../../hooks/useTranslatedText";

interface Props {
  planText: string;
}
const TermsAndConditions = ({ planText }: Props) => {
  // Translations
  const termsText = useTranslatedText("The general");
  const termsAndConditionsLink = useTranslatedText("terms and conditions");
  const alsoApplyText = useTranslatedText("also apply with regard to data protection. If you are satisfied with our service, no further action is required from you.");
  const cancelAnyTimeText = useTranslatedText("You can cancel any time.");
  const pricesIncludeVATText = useTranslatedText("All prices include VAT.");
  const serviceFor18PlusText = useTranslatedText("This service is only for person over 18 y.");

  return (
    <footer className={styles.termsAndConditions}>
      <p>
        {termsText} <a href="#">{termsAndConditionsLink}</a> {alsoApplyText} {planText} {cancelAnyTimeText} {pricesIncludeVATText} {serviceFor18PlusText}
      </p>
    </footer>
  );
};

export default TermsAndConditions;
