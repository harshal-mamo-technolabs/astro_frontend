import { Box, Flex, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Spinner, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useTranslatedText, useTranslatedTexts } from "../../hooks/useTranslatedText";

const DailyTransit = () => {
  const [dailyTransit, setDailyTransit] = useState([]);
  const [weeklyTransit, setWeeklyTransit] = useState([]);
  const [monthlyTransit, setMonthlyTransit] = useState([]);
  const [loading, setLoading] = useState(true);

  const transitReportText = useTranslatedText("Transit Report");
  const descriptionText = useTranslatedText("Planetary transits are crucial astrological events that are essential for studying their potential impacts on individuals. Below, you will find insights into daily, weekly, and monthly transits.");

  const tabTexts = useMemo(() => ["Daily Transit", "Weekly Transit", "Monthly Transit"], []);
  const translatedTabTexts = useTranslatedTexts(tabTexts);

  const tableHeaderTexts = useMemo(() => ["Transit Planet", "Aspect", "Natal Planet", "Transit Time"], []);
  const translatedTableHeaderTexts = useTranslatedTexts(tableHeaderTexts);

  const noDataText = useTranslatedText("No transit data available.");

  useEffect(() => {
    const fetchTransitData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}divine/divine-api`, {
          withCredentials: true,
        });

        console.log("Transit data:", response.data);

        // Extract transit data from the response
        const fetchedDailyTransit = response.data?.data?.astrologyData?.dailyTransit?.transit_response || [];
        const fetchedWeeklyTransit = response.data?.data?.astrologyData?.weeklyTransit?.transit_response || [];
        const fetchedMonthlyTransit = response.data?.data?.astrologyData?.monthlyTransit?.transit_response || [];

        setDailyTransit(fetchedDailyTransit);
        setWeeklyTransit(fetchedWeeklyTransit);
        setMonthlyTransit(fetchedMonthlyTransit);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching transit data:", error);
        setLoading(false);
      }
    };

    fetchTransitData();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" color="white" />
      </Flex>
    );
  }

  return (
    <div>
      <Flex justify="center" textColor="white">
        <Box mt={5} w="90%">
          <Text fontSize="4xl" textAlign="center" fontWeight="light">
            {transitReportText}
          </Text>

          <Box mt={10}>
            <Text fontSize="lg" mb={6}>
              {descriptionText}
            </Text>

            {/* Tabs for Daily, Weekly, and Monthly Transits */}
            <Tabs variant="enclosed" colorScheme="purple">
              <TabList>
                <Tab>{translatedTabTexts[0]}</Tab>
                <Tab>{translatedTabTexts[1]}</Tab>
                <Tab>{translatedTabTexts[2]}</Tab>
              </TabList>

              <TabPanels>
                {/* Daily Transit Tab */}
                <TabPanel>
                  <Text fontSize="2xl" fontWeight="semibold" mb={4}>
                    {translatedTabTexts[0]}
                  </Text>
                  <TransitTable data={dailyTransit} translatedTableHeaders={translatedTableHeaderTexts} noDataText={noDataText} />
                </TabPanel>

                {/* Weekly Transit Tab */}
                <TabPanel>
                  <Text fontSize="2xl" fontWeight="semibold" mb={4}>
                    {translatedTabTexts[1]}
                  </Text>
                  <TransitTable data={weeklyTransit} translatedTableHeaders={translatedTableHeaderTexts} noDataText={noDataText} />
                </TabPanel>

                {/* Monthly Transit Tab */}
                <TabPanel>
                  <Text fontSize="2xl" fontWeight="semibold" mb={4}>
                    {translatedTabTexts[2]}
                  </Text>
                  <TransitTable data={monthlyTransit} translatedTableHeaders={translatedTableHeaderTexts} noDataText={noDataText} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Flex>
    </div>
  );
};

const TransitTable = ({ data, translatedTableHeaders, noDataText }) => {
  if (data.length === 0) {
    return (
      <Text fontSize="lg" color="gray.500">
        {noDataText}
      </Text>
    );
  }

  return (
    <Table variant="simple" colorScheme="purple">
      <Thead>
        <Tr>
          <Th>{translatedTableHeaders[0]}</Th>
          <Th>{translatedTableHeaders[1]}</Th>
          <Th>{translatedTableHeaders[2]}</Th>
          <Th>{translatedTableHeaders[3]}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((transit, index) => (
          <Tr key={index}>
            <Td>{transit.transit_planet}</Td>
            <Td>{transit.aspect}</Td>
            <Td>{transit.natal_planet}</Td>
            <Td>
              {new Date(transit.transit_time).toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "numeric",
              })}
              ,{" "}
              {new Date(transit.transit_time).toLocaleDateString(undefined, {
                day: "numeric",
                month: "short",
              })}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default DailyTransit;