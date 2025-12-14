import { createContext, useContext, useState } from "react";
import axios from "axios";

const SynastryDataContext = createContext();

export const useSynastryData = () => useContext(SynastryDataContext);

export const SynastryDataProvider = ({ children }) => {
    const [synastryData, setSynastryData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSynastryData = async (partnerProfile) => {
        if (!partnerProfile) return;

        try {
            setLoading(true);
            setError(null);

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}divine/compare-profiles`,
                {
                    partner: {
                        full_name: partnerProfile?.name,
                        gender: partnerProfile?.gender,
                        day: partnerProfile?.day,
                        month: partnerProfile?.month,
                        year: partnerProfile?.year,
                        hour: partnerProfile?.hour,
                        min: partnerProfile?.min,
                        sec: 0,
                        lat: partnerProfile?.lat,
                        lon: partnerProfile?.lon,
                        place: partnerProfile?.place,
                        tzone: partnerProfile?.tzone,
                    },
                },
                { withCredentials: true }
            );

            console.log("Synastry data:", response.data);
            setSynastryData(response.data.data); // Store the synastry API response
        } catch (err) {
            console.error("Error fetching synastry data:", err);
            setError("Failed to fetch synastry data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SynastryDataContext.Provider value={{ synastryData, fetchSynastryData, loading, error }}>
            {children}
        </SynastryDataContext.Provider>
    );
};