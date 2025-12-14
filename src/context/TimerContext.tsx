import { useState, createContext } from "react";

export interface TimeLeft {
  minutes: number;
  seconds: number;
}

interface TimeContextProps {
  expirationTime: number | null;
  timeLeft: TimeLeft | null;
  setTimeLeft: (time: any) => void;
  setExpirationTime: (time: number) => void;
}

export const calculateTimeLeft = (expirationTime: number | null) => {
  if (expirationTime === null) return null;
  const difference = expirationTime - new Date().getTime();
  const timeLeft = {
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };

  if (timeLeft.minutes < 0 || timeLeft.seconds < 0) {
    return { minutes: 0, seconds: 0 };
  }

  localStorage.setItem("timeLeft", JSON.stringify(timeLeft));

  return timeLeft;
};
export const TimeContext = createContext<TimeContextProps>({
  expirationTime: null,
  setExpirationTime: () => {},
  timeLeft: null,
  setTimeLeft: () => {},
});

export const TimeConstructor = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expirationTime, setExpirationTime] = useState<number | null>(
    parseInt(localStorage.getItem("expirationTime") || "") || null
  );
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expirationTime));

  return (
    <TimeContext.Provider
      value={{
        expirationTime,
        setExpirationTime,
        timeLeft,
        setTimeLeft,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};
