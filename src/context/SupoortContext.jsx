import { createContext, useContext, useState } from "react";

const SupportContext = createContext();
export const SupportProvider = ({ children }) => {
  const [list, setList] = useState([]);
  return (
    <SupportContext.Provider
      value={{
        list,
        setList,
      }}
    >
      {children}
    </SupportContext.Provider>
  );
};

export const useSupportData = () => {
  return useContext(SupportContext);
};
