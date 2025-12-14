import { useContext, useEffect, useState, useMemo } from "react";
import styles from "./Card.module.scss";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { CardContext } from "../../context/CardContext";
import { pricingData } from "../../data";
import { useTranslatedText, useTranslatedTexts } from "../../hooks/useTranslatedText";

const Card = ({ data, onClick, subType }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const { selectedCard, setSelectedCard } = useContext(CardContext);

  // Translate offer title (HOT OFFER, SALE, TRY IT)
  const translatedTitle = useTranslatedText(data.title || "");
  
  // Translate plan name (PREMIUM, GOLD, STARTER)
  const translatedPlanName = useTranslatedText(data.name || "");
  
  // Translate months (2 months, 3 months, 3 days trial)
  const translatedMonths = useTranslatedText(data.trial || "");
  
  // Translate short offer/access text
  const translatedShortOffer = useTranslatedText(data.shortOffer || "");
  
  // Translate billed text
  const translatedBilled = useTranslatedText(data.billed || "");

  // Translate offer features array
  const offerArray = Array.isArray(data.offer) ? data.offer : [];
  const translatedOffers = useTranslatedTexts(offerArray);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleClick = () => {
    setIsClicked(!isClicked);
  };
  useEffect(() => {
    if (subType?.type === "PREMIUM") {
      setSelectedCard(pricingData[2]);
    }
  }, [subType]);
  return (
    <div
      className={`${styles.cardWrapper}  ${
        subType?.type === "TRIAL" &&
        (subType?.type === data.type || data.id === 1)
          ? "hidden"
          : ""
      }    

      ${
        subType?.type === "PREMIUM" &&
        (subType?.type === data.type || data.id === 1)
          ? "hidden"
          : ""
      }  

       ${subType?.type === "GOLD" && "hidden"}  

      `}
      onClick={onClick}
    >
      <a
        key={data.id}
        onClick={toggleClick}
        className={`${
          selectedCard?.id === data.id ? styles.clickedCard : styles.cardInner
        } `}
      >
        <div>
          <div>
            <h3 className={styles.cardTitle}>{translatedTitle}</h3>

            <h4 className={styles.cardSubtitle}>{translatedPlanName}</h4>
            <p className={styles.cardTrial}>{translatedMonths}</p>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.dropdownToggle} onClick={toggleDropdown}>
              {isOpen ? (
                <TiArrowSortedDown className={`${styles.arrow}  w-full`} />
              ) : (
                <TiArrowSortedUp className={`${styles.arrow}  w-full`} />
              )}
            </div>
            {isOpen ? (
              <p className={styles.shortContent}>{translatedShortOffer}</p>
            ) : (
              <ul className={styles.list}>
                {translatedOffers.map((line, idx) => (
                  <li className={styles.item} key={idx}>
                    {line}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <p className={styles.discount}>{data.discount}</p>
          <p className={styles.price}>*{data.price}€ </p>
          <div className={styles.billed}>
            <p>/{translatedBilled}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Card;
