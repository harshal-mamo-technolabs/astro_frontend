
import { createContext, useContext, useState } from "react";
import axios from "axios";

const DivineDataContext = createContext();

export const useDivineData = () => useContext(DivineDataContext);

export const DivineDataProvider = ({ children }) => {
    const [divineData, setDivineData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDivineData = async () => {
        if (divineData) return;

        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}divine/divine-api`, {
                withCredentials: true,
            });
            setDivineData(response.data?.data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data || err.message);
            setLoading(false);
        }
    };

    return (
        <DivineDataContext.Provider value={{ divineData, fetchDivineData, loading, error }}>
            {children}
        </DivineDataContext.Provider>
    );
};