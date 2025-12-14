import {
  Box,
  Flex,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import { useDivineData } from "../../context/DivineDataContext";
import { useTranslatedTexts, useTranslatedText } from "../../hooks/useTranslatedText";

const NatalReport = () => {
  const { divineData } = useDivineData();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Memoize static texts to avoid re-translating on every render (prevents flicker)
  const staticTexts = useMemo(
    () => [
      "No data available for the sign reports.",
      "Natal Report",
      "Below you will find a list of the main characteristics that you possess as per your birth chart. This is a summary based on the planet positions, aspects, and patterns that were found in your chart.",
    ],
    []
  );
  const [noDataText, natalReportText, reportIntroText] = useTranslatedTexts(staticTexts);
  const loadingText = useTranslatedText("Loading...");

  useEffect(() => {
    const fetchReports = () => {
      try {
        const fetchedReports = divineData?.astrologyData?.signReports || {};
        console.log("Fetched Sign Reports:", fetchedReports);

        const reportsArray = Object.values(fetchedReports);
        setReports(reportsArray);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching sign reports data:", error);
        setLoading(false);
      }
    };

    fetchReports();
  }, [divineData]);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner label={loadingText} size="xl" color="white" />
      </Flex>
    );
  }

  if (reports.length === 0) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Box fontSize="2xl" color="white">
          {noDataText}
        </Box>
      </Flex>
    );
  }

  return (
    <div>
      <Flex justify="center" textColor="white">
        <Box mt={5} w="90%">
          <Text fontSize="4xl" textAlign="center" fontWeight="light">
            {natalReportText}
          </Text>

          <Box mt={10}>
            <Text fontSize="lg" mb={6}>
              {reportIntroText}
            </Text>

            <Tabs variant="enclosed" colorScheme="purple">
              <TabList>
                {reports.map((report) => (
                  <Tab key={report.planet_name}>{report.planet_name}</Tab>
                ))}
              </TabList>

              <TabPanels>
                {reports.map((report) => (
                  <TabPanel key={report.planet_name}>
                    <Text fontSize="2xl" fontWeight="semibold" mb={4}>
                      {report.planet_name} is in {report.sign_name}
                    </Text>
                    <ul className="list-disc ml-6 mb-4">
                      {report.report.split("\n\n").map((item, index) => (
                        <li key={index}>
                          <Text>{item}</Text>
                        </li>
                      ))}
                    </ul>
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Flex>
    </div>
  );
};

export default NatalReport;