import { Box, Tabs, TabList, Tab, Image, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDivine } from "../../context/DivineHome";
import { useProfile } from "../../context/Profile";
import Emotions from "../../assets/Emotions.png";
import Health from "../../assets/Health.png";
import Personal from "../../assets/Personal.png";
import Professional from "../../assets/Profession.png";
import Travel from "../../assets/Travel.png";
import Luck from "../../assets/Luck.png";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const HoroScope = () => {
  const { avatar } = useProfile();
  const { horoscopeData, loading, error, fetchHoroscope } = useDivine();
  const [selectedDay, setSelectedDay] = useState("today");
  const [selectedCategory, setSelectedCategory] = useState("personal");

  const horoscopeTexts = useMemo(() => [
    "Loading your horoscope...",
    "Yesterday",
    "Today",
    "Tomorrow",
    "Personal",
    "Health",
    "Professional",
    "Emotions",
    "Travel",
    "Luck",
    "'s Horoscope",
    "No data available for this category.",
    "Horoscope data is not available for the selected day."
  ], []);
  
  const [
    loadingText,
    yesterdayText,
    todayText,
    tomorrowText,
    personalText,
    healthText,
    professionalText,
    emotionsText,
    travelText,
    luckText,
    horoscopeSuffix,
    noDataText,
    noDataForDayText
  ] = useTranslatedTexts(horoscopeTexts);

  useEffect(() => {
    if (!horoscopeData) {
      fetchHoroscope();
    }
  }, [horoscopeData, fetchHoroscope]);

  if (loading) {
    return (
      <Box className="bg-[#5f53d4] p-4 text-white text-center rounded shadow-lg">
        {loadingText}
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="bg-[#5f53d4] p-4 text-white text-center rounded shadow-lg">
        {error}
      </Box>
    );
  }

  const dayHoroscope = horoscopeData?.[avatar]?.[selectedDay];

  return (
    <Box className="bg-[#5f53d4] backdrop-blur-md bg-opacity-70 p-6 w-full h-full webkit-backdrop-blur-md text-white rounded shadow-lg">
      <div className="text-3xl font-bold text-center mb-6">
        {avatar}{horoscopeSuffix}
      </div>

      <Tabs onChange={(index) =>  setSelectedDay(["yesterday", "today", "tomorrow"][index])}>
        <TabList justifyContent="center" mb={6} borderBottom="none" className="gap-2" flexWrap="wrap">
          <Tab px={{ base: 4, md: 6 }} py={2}  bg="#29286c" color="white" _hover={{ borderBottom: "2px solid", borderColor: "white",  transition: "all 0.5s ease-in-out" }}>{yesterdayText}</Tab>
          <Tab px={{ base: 4, md: 6 }} py={2}  bg="#29286c" color="white" _hover={{ borderBottom: "2px solid", borderColor: "white",  transition: "all 0.5s ease-in-out" }}>{todayText}</Tab>
          <Tab px={{ base: 4, md: 6 }} py={2}  bg="#29286c" color="white" _hover={{ borderBottom: "2px solid", borderColor: "white",  transition: "all 0.5s ease-in-out" }}>{tomorrowText}</Tab>
        </TabList>
      </Tabs>

      {/* Tabs for Categories */}
      <Tabs onChange={(index) => setSelectedCategory(["personal", "health", "profession", "emotions", "travel", "luck"][index])}>
        <TabList borderBottom="none" justifyContent="center" mb={6} className="gap-2" flexWrap="wrap">
          <Tab px={{ base: 4, md: 6 }} py={2} 
          _selected={{ border:"1px", borderRadius:"5px", bg: "white", color:"#29286c"}}
          color="white" border="1px solid #29286c" borderRadius="5px" 
          _hover={{border:"1px", borderRadius:"5px", bg: "white", color:"#29286c"}}>
          <Flex align="center" gap={2}>
          <Image
            src={Personal}
            alt="Personal Icon"
            boxSize="20px"
          />
          {personalText}
        </Flex></Tab>
          <Tab  
          px={{ base: 4, md: 6 }} py={2} 
          _selected={{ border:"1px", borderRadius:"5px", bg: "white", color:"#29286c"}} 
          color="white" border="1px solid #29286c" 
          borderRadius="5px" 
          _hover={{border:"1px", borderRadius:"5px", bg: "white", color:"#29286c"}}>
          <Flex align="center" gap={2}>
          <Image
            src={Health}
            alt="Health Icon"
            boxSize="20px"
          />
          {healthText}
        </Flex>
        </Tab>
          <Tab px={{ base: 4, md: 6 }} py={2} 
          _selected={{ border:"1px", borderRadius:"5px", bg: "white", color:"#29286c"}} 
          color="white" border="1px solid #29286c" 
          borderRadius="5px" 
          _hover={{border:"1px", borderRadius:"5px", bg: "white", color:"#29286c"}}><Flex align="center" gap={2}>
          <Image
            src={Professional}
            alt="Professional Icon"
            boxSize="20px"
          />
          {professionalText}
        </Flex>
        </Tab>
          <Tab px={{ base: 4, md: 6 }} py={2} 
          _selected={{ border:"1px", borderRadius:"5px", bg: "white", color:"#29286c"}} 
          color="white" border="1px solid #29286c" 
          borderRadius="5px" 
          _hover={{border:"1px", borderRadius:"5px", bg: "white", color:"#29286c"}}>
          <Flex align="center" gap={2}>
          <Image
            src={Emotions}
            alt="Emotions Icon"
            boxSize="20px"
          />
          {emotionsText}
        </Flex>
        </Tab>
          <Tab px={{ base: 4, md: 6 }} py={2} 
          _selected={{ border:"1px", borderRadius:"5px", bg: "white", color:"#29286c"}} 
          color="white" border="1px solid #29286c" 
          borderRadius="5px" 
          _hover={{border:"1px", borderRadius:"5px", bg: "white", color:"#29286c"}}><Flex align="center" gap={2}>
          <Image
            src={Travel}
            alt="Travel Icon"
            boxSize="20px"
          />
          {travelText}
        </Flex>
        </Tab>
          <Tab px={{ base: 4, md: 6 }} py={2} 
          _selected={{ border:"1px", borderRadius:"5px", bg: "white", color:"#29286c"}} 
          color="white" border="1px solid #29286c" 
          borderRadius="5px" 
          _hover={{border:"1px", borderRadius:"5px", bg: "white", color:"#29286c"}}><Flex align="center" gap={2}>
          <Image
            src={Luck}
            alt="Luck Icon"
            boxSize="20px"
          />
          {luckText}
        </Flex>
        </Tab>
          </TabList>
    </Tabs>
      
      <Box className="text-lg font-nunito-light custom-scrollbar overflow-auto leading-loose text-white">
        {dayHoroscope ? (
          <p>{dayHoroscope.prediction?.[selectedCategory] || noDataText}</p>
        ) : (
          <p>{noDataForDayText}</p>
        )}
      </Box>
    </Box>
  );
};

export default HoroScope;