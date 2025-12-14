import { useMemo } from "react";
import { Text, Flex } from "@chakra-ui/react";
import { useSynastryData } from "../../context/DivineSynastry";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const SynastryFinancial = () => {
    const { synastryData } = useSynastryData();

    const financialTexts = useMemo(() => [
        "No Financial Aspect Reading data available.",
        "Financial Aspect Reading highlights the financial compatibility and shared resources between two individuals' charts.",
        "Financial Aspects",
        "Aspect:",
        "Type:",
        "Orb:",
        "Between:",
        "Unknown",
        "and"
    ], []);

    const [noFinancialText, financialDescriptionText, financialAspectsText, aspectText, typeText, orbText, betweenText, unknownText, andText] = useTranslatedTexts(financialTexts);

    console.log("Synastry Data in SynastryFinancial:", synastryData);


    const { financialContent, financialMessage } = useMemo(() => {
        const financialData = synastryData?.compatibilityReadings?.financial || {};
        return {
            financialContent: financialData.content || [],
            financialMessage: financialData.message?.[0] || null,
        };
    }, [synastryData]);

    console.log("Financial Content:", financialContent);
    console.log("Financial Message:", financialMessage);

    if (!financialContent.length && !financialMessage) {
        console.log("No Financial Aspect Reading data available.");
        return (
            <Flex justify="center" align="center" height="100vh">
                <div style={{ fontSize: "1.5rem", color: "white" }}>
                    {noFinancialText}
                </div>
            </Flex>
        );
    }

    return (
        <div className="min-h-screen flex flex-col w-full container mx-auto p-4 gap-y-4 text-white">

            <Text fontSize="lg" mb={4}>
                {financialDescriptionText}
            </Text>


            {financialContent.length === 0 && financialMessage && (
                <div className="bg-[#33175b] p-4 rounded-md text-lg">
                    <p>{financialMessage}</p>
                </div>
            )}


            {financialContent.length > 0 && (
                <div>
                    <h2 className="text-2xl text-center mb-4">{financialAspectsText}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {financialContent.map((aspect, index) => (
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

export default SynastryFinancial;