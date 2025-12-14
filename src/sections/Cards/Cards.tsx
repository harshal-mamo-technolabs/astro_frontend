import React, { useContext, useEffect, useState, useMemo } from "react";
import Card from "../../components/Card/Card";
import styles from "./Cards.module.scss";
import { pricingData } from "../../data";
import { CardContext } from "../../context/CardContext";
import axios from "axios";
import { Spin } from "antd";
import { useTranslatedText } from "../../hooks/useTranslatedText";

const Cards = ({premium,loading}) => {
  const { setSelectedCard } = useContext(CardContext);

  // Translation
  const alreadyPurchasedText = useTranslatedText("You have Already Purchase Gold Subscription");

  const handleCardClick = (cardData: any) => {
    setSelectedCard(cardData); 
  };

  return (
<Spin spinning={loading}>
<div className={`${styles.cards} ${premium && "justify-center"}`}>
        {premium?.type === "GOLD" && (
        <h2 className="text-white text-center text-xl">
          {alreadyPurchasedText}
        </h2>
      )}
      {pricingData.map((data, index) => (

        <Card key={index}  data={data} onClick={() => handleCardClick(data)} subType={premium} />
      ))}
    </div>
</Spin>
   
  );
};

export default Cards;
