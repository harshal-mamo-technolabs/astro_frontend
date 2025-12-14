import React, { useMemo } from "react";
import { Text, Flex } from "@chakra-ui/react";
import { useSynastryData } from "../../context/DivineSynastry";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const SynastryEmotional = () => {
    const { synastryData } = useSynastryData();

    const emotionalTexts = useMemo(() => [
        "No Emotional Aspect Reading data available.",
        "Emotional Aspect Reading highlights the emotional connections and compatibility between two individuals' charts.",
        "Emotional Aspects",
        "Aspect:",
        "Type:",
        "Orb:",
        "Between:",
        "Unknown",
        "and"
    ], []);

    const [noEmotionalText, emotionalDescriptionText, emotionalAspectsText, aspectText, typeText, orbText, betweenText, unknownText, andText] = useTranslatedTexts(emotionalTexts);

    console.log("Synastry Data in SynastryEmotional:", synastryData);

    const { emotionalContent, emotionalMessage } = useMemo(() => {
        const emotionalData = synastryData?.compatibilityReadings?.emotional || {};
        return {
            emotionalContent: emotionalData.content || [],
            emotionalMessage: emotionalData.message?.[0] || null,
        };
    }, [synastryData]);


    console.log("Emotional Content:", emotionalContent);
    console.log("Emotional Message:", emotionalMessage);

    if (!emotionalContent.length && !emotionalMessage) {
        console.log("No Emotional Aspect Reading data available.");
        return (
            <Flex justify="center" align="center" height="100vh">
                <div style={{ fontSize: "1.5rem", color: "white" }}>
                    {noEmotionalText}
                </div>
            </Flex>
        );
    }

    return (
        <div className="min-h-screen flex flex-col w-full container mx-auto p-4 gap-y-4 text-white">

            <Text fontSize="lg" mb={4}>
                {emotionalDescriptionText}
            </Text>


            {emotionalContent.length === 0 && emotionalMessage && (
                <div className="bg-[#33175b] p-4 rounded-md text-lg">
                    <p>{emotionalMessage}</p>
                </div>
            )}


            {emotionalContent.length > 0 && (
                <div>
                    <h2 className="text-2xl text-center mb-4">{emotionalAspectsText}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {emotionalContent.map((aspect, index) => (
                            <div key={index} className="text-lg bg-[#33175b] p-4 rounded-md">
                                <p>
                                    • <span className="font-semibold">{aspectText}</span> {aspect.aspect}
                                </p>
                                <p>
                                    • <span className="font-semibold">{typeText}</span> {aspect.aspect_type}
                                </p>
                                <p>
                                    • <span className="font-semibold">{orbText}</span> {aspect.orb.toFixed(2)}°
                                </p>
                                <p>
                                    • <span className="font-semibold">{betweenText}</span>{" "}
                                    {aspect.p1?.planet || unknownText} {andText} {aspect.p2?.planet || unknownText}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SynastryEmotional;