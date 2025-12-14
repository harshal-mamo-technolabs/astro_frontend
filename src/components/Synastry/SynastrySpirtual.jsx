import { useMemo } from "react";
import { Text, Flex } from "@chakra-ui/react";
import { useSynastryData } from "../../context/DivineSynastry";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const SynastrySpiritual = () => {
    const { synastryData } = useSynastryData();

    const spiritualTexts = useMemo(() => [
        "No Spiritual Aspect Reading data available.",
        "Spiritual Aspect Reading highlights the deeper, spiritual connections between two individuals' charts.",
        "Spiritual Aspects",
        "Aspect:",
        "Type:",
        "Orb:",
        "Between:",
        "Unknown",
        "and"
    ], []);

    const [noSpiritualText, spiritualDescriptionText, spiritualAspectsText, aspectText, typeText, orbText, betweenText, unknownText, andText] = useTranslatedTexts(spiritualTexts);

    console.log("Synastry Data in SynastrySpiritual:", synastryData);

    const { spiritualContent, spiritualMessage } = useMemo(() => {
        const spiritualData = synastryData?.compatibilityReadings?.spiritual || {};
        return {
            spiritualContent: spiritualData.content || [],
            spiritualMessage: spiritualData.message?.[0] || null,
        };
    }, [synastryData]);


    console.log("Spiritual Content:", spiritualContent);
    console.log("Spiritual Message:", spiritualMessage);

    if (!spiritualContent.length && !spiritualMessage) {
        console.log("No Spiritual Aspect Reading data available.");
        return (
            <Flex justify="center" align="center" height="100vh">
                <div style={{ fontSize: "1.5rem", color: "white" }}>
                    {noSpiritualText}
                </div>
            </Flex>
        );
    }

    return (
        <div className="min-h-screen flex flex-col w-full container mx-auto p-4 gap-y-4 text-white">

            <Text fontSize="lg" mb={4}>
                {spiritualDescriptionText}
            </Text>


            {spiritualContent.length === 0 && spiritualMessage && (
                <div className="bg-[#33175b] p-4 rounded-md text-lg">
                    <p>{spiritualMessage}</p>
                </div>
            )}


            {spiritualContent.length > 0 && (
                <div>
                    <h2 className="text-2xl text-center mb-4">{spiritualAspectsText}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {spiritualContent.map((aspect, index) => (
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

export default SynastrySpiritual;