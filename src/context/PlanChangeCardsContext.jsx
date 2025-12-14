import { createContext, useContext, useState } from "react";

const PlanChangeCardsContext = createContext();

export const PlanChangeCardsProvider = ({ children }) => {
  // Only the card data and related state for plan change flows
  const cards = [
    {
      id: 1,
      offer: "TRY IT",
      plan: "STARTER",
      months: "3 days trial",
      access: "full access on all chart and one personal report",
      then: "Then €19.99 weekly",
      charge: "*2.99€",
      extracharge: "19.99",
      lookup_key: "zodiya_trial_test",
      discount: "",
      get: [
        "Natal Chart report",
        "Synastry chart",
        "Transit chart",
        "Solar return chart",
        "Numerology insight",
        "Daily Tarot",
        "Daily Horoscope",
        "Annual Horoscope",
      ],
      cancel1: "*You can cancel any time. Total charge 2.99€.",
      cancel2: " After 3 days trial you will be charged 19.99€ weekly,",
      cancel2text: " billed monthly.",
      cancel3: " Subscription is auto renewable until cancelation.",
    },
    {
      id: 2,
      offer: "HOT OFFER",
      plan: "PREMIUM",
      months: "2 months",
      access: "All included in Starter plan + ",
      then: "/weekly billed for 2 months",
      charge: "14.99€",
      discount: "-10%",
      extracharge: "119.92€",
      lookup_key: "zodiya_premium_test",
      get: [
        "Synastry report",
        "Transit report",
        "Solar return report",
        "Numerology report",
      ],
      cancel1: "*You can cancel anytime. Total charge 119,92€ ",
      cancel2: "Subscriptions is auto renewable until cancelation.",
      cancel2text: " billed monthly.",
      cancel3: "Subscription is auto renewable until cancelation",
    },
    {
      id: 3,
      offer: "SALE",
      plan: "GOLD",
      months: "3 months",
      access: "All included in Premium plan +",
      then: "/weekly billed for 3 months",
      charge: "13.99€",
      extracharge: "167.88€",
      discount: "-20%",
      lookup_key: "zodiya_gold_test",
      get: [
        "Synastry report",
        "Transit report",
        "Solar return report",
        "Numerology report",
      ],
      cancel1: "*You can cancel any time. Total charge 167.88€.",
      cancel2: "Subscriptions is auto renewable until cancelation.",
      cancel2text: " billed monthly.",
      cancel3: "Subscription is auto renewable until cancelation",
    },
  ];
  const [selectedCard, setSelectedCard] = useState(cards[0]);

  return (
    <PlanChangeCardsContext.Provider value={{ cards, selectedCard, setSelectedCard }}>
      {children}
    </PlanChangeCardsContext.Provider>
  );
};

export const usePlanChangeCards = () => {
  return useContext(PlanChangeCardsContext);
}; 