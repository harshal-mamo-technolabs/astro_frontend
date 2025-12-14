import { Box, Flex, Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import { useSynastryData } from "../../context/DivineSynastry";
import { useEffect, useMemo } from "react";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const SynastryChart = () => {
  const { synastryData, fetchSynastryData, loading, error } = useSynastryData();

  const chartTexts = useMemo(() => [
    "Loading...",
    "Error fetching data",
    "No data available",
    "'s Natal Chart",
    "No chart available",
    "Personal Details",
    "Name",
    "Partner",
    "Description"
  ], []);

  const [loadingText, errorText, noDataText, natalChartText, noChartText, personalDetailsText, nameText, partnerText, descriptionText] = useTranslatedTexts(chartTexts);

  useEffect(() => {
    if (!synastryData) {
      console.log("Fetching synastry data...");
      fetchSynastryData();
    } else {
      console.log("Synastry data already available in context:", synastryData);
    }
  }, [synastryData, fetchSynastryData]);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <div style={{ fontSize: "2xl", color: "white" }}>{loadingText}</div>
      </Flex>
    );
  }

  if (error || !synastryData) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <div style={{ fontSize: "2xl", color: "white" }}>
          {error ? errorText : noDataText}
        </div>
      </Flex>
    );
  }

  const { profiles, synastryChart } = synastryData;
  const { mainUser, partner } = profiles;
  const { natalWheelChart } = synastryChart;

  return (
    <Flex direction="column" gap={10} p={6}>

      <Flex justify="space-evenly" wrap="wrap" gap={10}>

        <Box>
          <h2 style={{ fontSize: "2xl", textAlign: "center", marginBottom: "1.5rem", color: "white" }}>
            {mainUser.name}{natalChartText}
          </h2>
          <Flex justify="center">
            {natalWheelChart?.p1?.base64_image ? (
              <img
                src={natalWheelChart.p1.base64_image}
                alt={`${mainUser.name}${natalChartText}`}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            ) : (
              <div style={{ color: "white" }}>{noChartText}</div>
            )}
          </Flex>
        </Box>

        <Box>
          <h2 style={{ fontSize: "2xl", textAlign: "center", marginBottom: "1.5rem", color: "white" }}>
            {partner.name}{natalChartText}
          </h2>
          <Flex justify="center">
            {natalWheelChart?.p2?.base64_image ? (
              <img
                src={natalWheelChart.p2.base64_image}
                alt={`${partner.name}${natalChartText}`}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            ) : (
              <div style={{ color: "white" }}>{noChartText}</div>
            )}
          </Flex>
        </Box>
      </Flex>

      <Flex direction="column" gap={8}>
        <Box>
          <h2 style={{ fontSize: "2xl", textAlign: "center", marginBottom: "1.5rem", color: "white" }}>
            {personalDetailsText}
          </h2>
          <TableContainer>
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Td fontWeight="bold" style={{ color: "white", padding: "1rem" }}>{nameText}</Td>
                  <Td style={{ color: "white", padding: "1rem" }}>{mainUser.name}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" style={{ color: "white", padding: "1rem" }}>{partnerText}</Td>
                  <Td style={{ color: "white", padding: "1rem" }}>{partner.name}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" style={{ color: "white", padding: "1rem" }}>{descriptionText}</Td>
                  <Td style={{ color: "white", padding: "1rem" }}>{synastryChart.description}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </Flex>
  );
};

export default SynastryChart;