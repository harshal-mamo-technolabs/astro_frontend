import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CardContext = createContext();

const CardsContext = ({ children }) => {
  const [signupData, setSignupData] = useState([]);
  const [redirect, setRedirect] = useState("");
  const [allNatalChartData, setAllNatalChartData] = useState([]);
  const [data, setData] = useState([]);
  const [fullprofile, setFullprofile] = useState({});
  const [personality, setPersonality] = useState({});
  const [login, setLoginUser] = useState({});
  const [numbers, setNumbers] = useState({});
  const [lifePath, setLifePath] = useState({});
  const [personalitynum, setPersonalitynum] = useState({});
  const [expression, setExpression] = useState({});
  const [clientSecret, setClientSecret] = useState("");
  const [soul, setSoul] = useState({});
  const [subconscious, setSubconscious] = useState({});
  const [loadingform, setLoadingform] = useState(false);
  const [profile, setProfile] = useState({});
  const [solardatas, setSolarDatas] = useState({
    details: [],
    aspects: [],
    planets: [],
    houses: [],
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}users/me/full`, {
        withCredentials: true,
      })
      .then((res) => {
        setProfile(res.data.data);
          setFullprofile(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <CardContext.Provider
      value={{
        signupData,
        setSignupData,
        profile,
        allNatalChartData,
        setAllNatalChartData,
        redirect,
        setRedirect,
        data,
        solardatas,
        setSolarDatas,
        setData,
        fullprofile,
        setFullprofile,
        personality,
        setPersonality,
        login,
        setLoginUser,
        numbers,
        setNumbers,
        lifePath,
        setLifePath,
        personalitynum,
        setPersonalitynum,
        expression,
        setExpression,
        soul,
        setSoul,
        setSubconscious,
        subconscious,
        loadingform,
        clientSecret,
        setClientSecret,
        setLoadingform,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export default CardsContext;
