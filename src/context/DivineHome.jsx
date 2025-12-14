import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
const DivineContext = createContext();

// Provider component
export const DivineProvider = ({ children }) => {
    const [horoscopeData, setHoroscopeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHoroscope = async () => {
        if (horoscopeData) return; // If data already exists, skip the API call
        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}divine/daily-horoscope`,
                {
                    withCredentials: true,
                }
            );
            console.log("Horoscope API Response:", response.data);
            setHoroscopeData(response.data?.data);
        } catch (err) {
            console.error("Error fetching horoscope data:", err);
            setError("Failed to fetch horoscope data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHoroscope();
    }, []); // Fetch data on mount

    return (
        <DivineContext.Provider value={{ horoscopeData, loading, error, fetchHoroscope }}>
            {children}
        </DivineContext.Provider>
    );
};

// Custom hook to use the context
export const useDivine = () => {
    return useContext(DivineContext);
};