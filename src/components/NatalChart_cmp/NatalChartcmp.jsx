import { Box, Flex, Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import { useDivineData } from "../../context/DivineDataContext";
import { useEffect, useMemo } from "react";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const NatalChartcmp = () => {
  const { divineData, fetchDivineData, loading, error } = useDivineData();


  useEffect(() => {
    if (!divineData) {
      console.log("Fetching data from Divine API...");
      fetchDivineData();
    } else {
      console.log("Data already available in context:", divineData);
    }
  }, [divineData, fetchDivineData]);

  const { risingSign, sunSign, moonSign } = useMemo(() => {
    const result = {
      risingSign: "Unknown",
      sunSign: "Unknown",
      moonSign: "Unknown",
    };

    if (divineData?.astrologyData?.ascendantReport?.sign) {
      result.risingSign = divineData.astrologyData.ascendantReport.sign;
    }

    if (divineData?.astrologyData?.planetaryPositions) {
      const sun = divineData.astrologyData.planetaryPositions.find(
        (planet) => planet.name === "Sun" || planet.name === "Sonne"
      );
      const moon = divineData.astrologyData.planetaryPositions.find(
        (planet) => planet.name === "Moon" || planet.name === "Mond"
      );

      if (sun) result.sunSign = sun.sign;
      if (moon) result.moonSign = moon.sign;
    }

    console.log("Extracted Signs:", result);
    return result;
  }, [divineData]);

  // Format date and time for display
  const userDetails = useMemo(() => {
    const user = divineData?.userProfile;

    if (!user) return { date: "Unknown", time: "Unknown" };

    const dob = new Date();
    dob.setDate(user.day);
    dob.setMonth(user.month - 1);
    dob.setFullYear(user.year);

    const dateStr = dob.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const hour = user.hour;
    const isAM = hour < 12;
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const timeStr = `${displayHour}:${user.min < 10 ? "0" + user.min : user.min} ${isAM ? "AM" : "PM"
      }`;

    const formattedDetails = {
      date: dateStr,
      time: timeStr,
    };

    console.log("Formatted User Details:", formattedDetails);
    return formattedDetails;
  }, [divineData]);

  // Static text translations
  const staticTexts = useMemo(
    () => [
      "Loading...",
      "Error fetching data",
      "No data available",
      "Natal Wheel Chart",
      "No chart available",
      "Personal Details",
      "Name",
      "Date of Birth",
      "Time of Birth",
      "Astrological Details",
      "Rising Sign",
      "Sun Sign",
      "Moon Sign",
    ],
    []
  );

  const [
    loadingText,
    errorText,
    noDataText,
    natalWheelChartText,
    noChartAvailableText,
    personalDetailsText,
    nameText,
    dobText,
    tobText,
    astroDetailsText,
    risingSignText,
    sunSignText,
    moonSignText,
  ] = useTranslatedTexts(staticTexts);

  if (loading) {
    console.log("Loading data...");
    return (
      <Flex justify="center" align="center" height="100vh">
        <div style={{ fontSize: "2xl", color: "white" }}>{loadingText}</div>
      </Flex>
    );
  }

  if (error || !divineData) {
    console.error("Error or no data available:", error);
    return (
      <Flex justify="center" align="center" height="100vh">
        <div style={{ fontSize: "2xl", color: "white" }}>
          {error ? errorText : noDataText}
        </div>
      </Flex>
    );
  }

  const profileData = divineData.userProfile;
  console.log("Profile Data:", profileData);

  return (
    <Flex direction={["column", "column", "row"]} gap={10} p={6}>
      {/* Left side: Wheel Chart */}
      <div>
        <h2 style={{ fontSize: "2xl", textAlign: "center", marginBottom: "1.5rem", color: "white" }}>
          {natalWheelChartText}
        </h2>
        <Flex justify="center">
          {divineData.astrologyData?.wheelChart?.base64_image ? (
            <img
              src={divineData.astrologyData.wheelChart.base64_image}
              alt="Natal Wheel Chart"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          ) : (
            <div style={{ color: "white" }}>{noChartAvailableText}</div>
          )}
        </Flex>
      </div>

      <Flex direction="column" gap={8} flex="1">
        {/* Personal Details */}
        <div>
          <h2 style={{ fontSize: "2xl", textAlign: "center", marginBottom: "1.5rem", color: "white" }}>
            {personalDetailsText}
          </h2>
          <TableContainer>
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Td fontWeight="bold" style={{ color: "white", padding: "1rem" }}>{nameText}</Td>
                  <Td style={{ color: "white", padding: "1rem" }}>{profileData?.name || "Unknown"}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" style={{ color: "white", padding: "1rem" }}>{dobText}</Td>
                  <Td style={{ color: "white", padding: "1rem" }}>{userDetails.date}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" style={{ color: "white", padding: "1rem" }}>{tobText}</Td>
                  <Td style={{ color: "white", padding: "1rem" }}>{userDetails.time}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </div>


        <div>
          <h2 style={{ fontSize: "2xl", textAlign: "center", marginBottom: "1.5rem", color: "white" }}>
            {astroDetailsText}
          </h2>
          <TableContainer>
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Td fontWeight="bold" style={{ color: "white", padding: "1rem" }}>{risingSignText}</Td>
                  <Td style={{ color: "white", padding: "1rem" }}>{risingSign}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" style={{ color: "white", padding: "1rem" }}>{sunSignText}</Td>
                  <Td style={{ color: "white", padding: "1rem" }}>{sunSign}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" style={{ color: "white", padding: "1rem" }}>{moonSignText}</Td>
                  <Td style={{ color: "white", padding: "1rem" }}>{moonSign}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </Flex>
    </Flex>
  );
};

export default NatalChartcmp;