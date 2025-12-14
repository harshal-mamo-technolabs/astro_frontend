import { Select } from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import { useDivineData } from "../../context/DivineDataContext"; // Import DivineDataContext
import { useTranslatedText, useTranslatedTexts } from "../../hooks/useTranslatedText";

const Numerologypage = () => {
  const { divineData, fetchDivineData, loading, error } = useDivineData(); // Access data and fetch function from context
  const [selectedKey, setSelectedKey] = useState(""); // State to track selected dropdown key

  const loadingText = useTranslatedText("Loading...");
  const errorText = useTranslatedText("Error:");
  const noDataText = useTranslatedText("No numerology data available.");
  const selectPlaceholderText = useTranslatedText("Select a Numerology Aspect");
  const pleaseSelectText = useTranslatedText("Please select a numerology aspect from the dropdown.");

  const staticTexts = useMemo(() => ["Strengths:", "Challenges:"], []);
  const translatedStaticTexts = useTranslatedTexts(staticTexts);

  // Fetch Divine API data on component mount
  useEffect(() => {
    if (!divineData) {
      console.log("Fetching data from Divine API...");
      fetchDivineData()
        .then(() => console.log("Data fetched successfully"))
        .catch((err) => console.error("Error fetching data:", err));
    } else {
      console.log("Data already available in context:", divineData);
    }
  }, [divineData, fetchDivineData]);

  // Extract numerologyReport from divineData
  const numerologyReport = divineData?.astrologyData?.numerologyReport || {};

  // Set the first key as the default selected key
  useEffect(() => {
    if (numerologyReport && !selectedKey) {
      const firstKey = Object.keys(numerologyReport)[0];
      if (firstKey) {
        setSelectedKey(firstKey);
      }
    }
  }, [numerologyReport, selectedKey]);

  // Handle dropdown selection
  const handleSelection = (event) => {
    setSelectedKey(event.target.value);
  };

  // Get the selected data
  const selectedData = numerologyReport?.[selectedKey];

  // Handle loading and error states
  if (loading) return <div className="text-white">{loadingText}</div>;
  if (error) return <div className="text-white">{errorText} {error.message}</div>;

  // Handle case where numerologyReport is empty
  if (!numerologyReport || Object.keys(numerologyReport).length === 0) {
    return <div className="text-white">{noDataText}</div>;
  }

  return (
    <div className="flex flex-col items-center gap-5 mt-5 text-white w-full">
      {/* Dropdown to select numerology data */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between px-5 md:px-[7rem] gap-6 mt-5">
    <div className="w-40 h-40 bg-[#551d91] text-white rounded-full flex items-center justify-center text-7xl shadow-md">
    {selectedData?.number || "—"}
    </div>
      <Select
        placeholder={selectPlaceholderText}
        size="lg"
        onChange={handleSelection}
        bg="#551d91"
        color="purple.300"
        focusBorderColor="white"
        w={{base:"full",md:"30%"}}
        marginBottom="20px"
        value={selectedKey} // Bind the dropdown to the selectedKey state
      >
        {Object.keys(numerologyReport).map((key) => (
          <option key={key} value={key}>
            {numerologyReport[key]?.name || key}
          </option>
        ))}
      </Select>
</div>
      {/* Display selected data */}
      {selectedData ? (
        <div className="w-full px-10">
          <h2 className="text-5xl font-bold text-center mb-4">{selectedData.name}</h2>
          <p className="text-lg mb-4 leading-relaxed">{selectedData.description}</p>
          <div className="mb-4">
            <h3 className="text-2xl font-semibold mb-2">{translatedStaticTexts[0]}</h3>
            <ul className="list-disc ml-5">
              {selectedData.strengths?.map((strength, index) => (
                <li key={index} className="text-lg leading-relaxed">
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">{translatedStaticTexts[1]}</h3>
            <ul className="list-disc ml-5">
              {selectedData.challenges?.map((challenge, index) => (
                <li key={index} className="text-lg leading-relaxed">
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>{pleaseSelectText}</div>
      )}
    </div>
  );
};

export default Numerologypage;