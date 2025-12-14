import { createContext, useRef, useState } from "react";
import { pricingData } from "../data";

export interface CardData {
  id: number;
  title: string;
  name: string;
  trial: string;
  offer: string[];
  discount?: string;
  price: string;
  shortOffer: string;
  billed: string;
}

interface CardContextProps {
  selectedCard: CardData | null;
  setSelectedCard: (card: CardData) => void;
  continueButtonRef: React.RefObject<HTMLButtonElement>;
}
export const CardContext = createContext<CardContextProps>({
  selectedCard: null,
  setSelectedCard: () => {},
  continueButtonRef: { current: null },
});

export const CardConstructor = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(
    pricingData[1]
  );
  const continueButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <CardContext.Provider
      value={{
        selectedCard,
        setSelectedCard,
        continueButtonRef,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
