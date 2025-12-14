import { createContext, useContext, useEffect, useState } from "react";
import { CardContext } from "./CardsDataContext";
import Aries from "../assets/Avatars/Aries.png";
import Taurus from "../assets/Avatars/Taurus.png";
import Gemini from "../assets/Avatars/Gemini.png";
import Cancer from "../assets/Avatars/Cancer.png";
import Leo from "../assets/Avatars/Leo.png";
import Virgo from "../assets/Avatars/Virgo.png";
import Libra from "../assets/Avatars/Libra.png";
import Scorpio from "../assets/Avatars/Scorpio.png";
import Sagittarius from "../assets/Avatars/Sagittarius.png";
import Capricorn from "../assets/Avatars/Capricorn.png";
import Aquarius from "../assets/Avatars/Aquarius.png";
import Pisces from "../assets/Avatars/Pisces.png";

const getZodiacImage = (zodiacSign) => {
  switch (zodiacSign) {
    case "Aries":
      return Aries;
    case "Taurus":
      return Taurus;
    case "Gemini":
      return Gemini;
    case "Cancer":
      return Cancer;
    case "Leo":
      return Leo;
    case "Virgo":
      return Virgo;
    case "Libra":
      return Libra;
    case "Scorpio":
      return Scorpio;
    case "Sagittarius":
      return Sagittarius;
    case "Capricorn":
      return Capricorn;
    case "Aquarius":
      return Aquarius;
    case "Pisces":
      return Pisces;
    default:
      return Aries;
  }
};

const PlanChangeProfileContext = createContext();

export const PlanChangeProfileProvider = ({ children }) => {
  const [current, setCurrent] = useState(0);
  const { fullprofile } = useContext(CardContext);
  const cards = [
    {
      id: 1,
      offer: "TRY IT",
      plan: "STARTER",
      months: "1 Months",
      access: "full access on all chart and one personal report",
      then: "weekly billed for 1 month",
      charge: "19.99 €",
      extracharge: "79.96",
      lookup_key: "zodiya_starter",
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
      cancel1: "*You can cancel anytime. Total charge 79.96€ ",
      cancel2: "Subscriptions is auto renewable until cancelation.",
      cancel2text: " billed monthly.",
      cancel3: "Subscription is auto renewable until cancelation",
    },
    {
      id: 2,
      offer: "HOT OFFER",
      plan: "PREMIUM",
      months: "2 months",
      access: "All included in Starter plan + ",
      then: "weekly billed for 2 months",
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
  const [unselectedPlans, setUnSelectedPlans] = useState([]);
  const [paymentList, setPaymentList] = useState(null);
  const [selectedCard, setSelectedCard] = useState(cards[0]);
  const [Payprofile, setPayprofile] = useState(true);
  const [user, setUser] = useState(true);
  const [myProfile, setMyProfile] = useState({
    name: "Antonio",
    DOB: "2000-01-01",
    timeOfBirth: "09:13",
    placeOfBirth: "Osjek, Baranja,Croatia",
    gender: "male",
  });
  const [newProfile, setNewProfile] = useState([]);
  const [formData, setFormData] = useState({
    // step2: {},
    step3: {},
    step4: "",
    step5: "",
    step6: "",
    isAuth: false,
  });
  const [deletefriendloader, setDeleteFriendLoader] = useState(false);
  const [friendslist, setFriendslist] = useState([]);
  const [isFree, setIsFree] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [synastryFriends, setSynastryFriends] = useState([]);
  const [selectedUser, setSelectedUser] = useState({
    zodiacSign: null,
    you: true,
  });
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [skip, setSkip] = useState(false);
  const [loadingprofile, setLoadingProfile] = useState(false);
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    if (fullprofile?.zodiacSign) {
      setSelectedUser((currentUser) => ({
        ...currentUser,
        zodiacSign: fullprofile?.zodiacSign,
        _id: fullprofile?._id,
      }));
      setAvatar(fullprofile?.zodiacSign);
    }
  }, [fullprofile?.zodiacSign]);
  return (
    <PlanChangeProfileContext.Provider
      value={{
        cards,
        setSelectedCard,
        avatar,
        setAvatar,
        current,
        setCurrent,
        selectedCard,
        deletefriendloader,
        setDeleteFriendLoader,
        updateLoading,
        setUpdateLoading,
        setUnSelectedPlans,
        loadingprofile,
        getZodiacImage,
        Payprofile,
        setPayprofile,
        synastryFriends,
        setSynastryFriends,
        isFree,
        setIsFree,
        setLoadingProfile,
        unselectedPlans,
        user,
        setUser,
        myProfile,
        setMyProfile,
        newProfile,
        setNewProfile,
        formData,
        setFormData,
        setSelectedPartner,
        selectedPartner,
        skip,
        paymentList,
        setPaymentList,
        setSkip,
        selectedUser,
        setSelectedUser,
        friendslist,
        setFriendslist,
      }}
    >
      {children}
    </PlanChangeProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(PlanChangeProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a PlanChangeProfileProvider");
  }
  return context;
};
