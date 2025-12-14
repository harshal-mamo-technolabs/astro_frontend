import ServiceCard from "../Service/ServiceCard/index.js";
import { Box, Center } from "@chakra-ui/react";
import NatalLogo from "../.././assets/natal.png";
//import sun from "../.././assets/sun.png";
import sagittarius from "../.././assets/sagittarius.png";
import cancer1 from "../.././assets/cancer1.png";
import moon from "../.././assets/moon.png";
import tarot from "../.././assets/tarot.png";
import Natalchart from "../../assets/natalimg.png";
import compatibility from "../../assets/compantibility.png";
import Numerology from "../../assets/Numerlogyimg.png";
import tarotimg from "../../assets/tarocrcsl.png";
import transits from "../../assets/transit.png";
import SolarReturn from "../../assets/SolarReturn.png";
import NatalMoon from "../../assets/NatalMoon.png";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const Service = () => {
  const serviceTexts = useMemo(() => [
    "Services",
    "Natal Chart",
    "Open you full Natal Chart Report",
    "Get your birth chart report based on precise planetary positions at the moment of your birth to unveil meaningful details about yourself and your hidden talents.",
    "Natal chart, is a snapshot of celestial positions at birth, revealing personality traits, strengths, and life path potential based on astrological analysis. It's a tool for self-discovery and understanding relationships through the alignment of cosmic energies.",
    "Moon Phase Report",
    "Unlock the Secrets of the Moon Phases in Your Life",
    "Understand how each moon phase influences your emotions, energy, and intentions throughout the lunar cycle.",
    "A Moon Phase Report reveals how the phases of the moon influence your personal energy, emotions, and manifestations. Based on your birth chart and lunar cycles, it helps you align with the moon's rhythm to optimize decision-making, self-care, and goal setting.",
    "Synastry",
    "Get the ultimate Compatibility Report",
    "Get incredible insight into all the factors influencing your relationship dynamics, as well as past life and karmic connections and lessons",
    "Synastry is a profound tool to find out if the Two of You are in sync, where your love story is waiting to be revealed in its full, captivating depth. It reveals strengths, challenges, and compatibility in relationships, aiding understanding and navigation of interpersonal dynamics.",
    "Numerology",
    "Your Monthly Numerology Forecast Report",
    "Reveal the Numerology energy behind your Personal Month Forecast",
    "Numerology offers personalized insights and guidance based on the interpretation of numerical patterns derived from your birth date, name, and other numbers. Whether you seek clarity on career choices, relationships, or persnal development, numerology is offering valuable perspectives and actionable advice.",
    "Daily transit",
    "Find Out How the Planetary Transits Impact Your Life!",
    "Find out how the upcoming months will be with a detailed transit report",
    "A Transit Chart analysis involves a method of interpreting the current movement of the planets as they transit the zodiac signs on any given day. Daily transit readings provide guidance on navigating daily life, making decisions, and understanding the broader cosmic influences shaping your experiences.",
    "Daily Tarot",
    "A daily tarot service offers personalized insights and guidance through the interpretation of tarot cards drawn for each day. Each daily reading offers unique guidance and reflections, helping you navigate your day with clarity and confidence."
  ], []);
  
  const [
    servicesText,
    natalChartText,
    natalChartHeading,
    natalChartFootdesc,
    natalChartDescribtion,
    moonPhaseText,
    moonPhaseHeading,
    moonPhaseFootdesc,
    moonPhaseDescribtion,
    synastryText,
    synastryHeading,
    synastryFootdesc,
    synastryDescribtion,
    numerologyText,
    numerologyHeading,
    numerologyFootdesc,
    numerologyDescribtion,
    dailyTransitText,
    dailyTransitHeading,
    dailyTransitFootdesc,
    dailyTransitDescribtion,
    dailyTarotText,
    dailyTarotDescribtion
  ] = useTranslatedTexts(serviceTexts);

  return (
    <div className=" p-1 mt-9">
      <h1 className="text-4xl  lg:text-5xl font-bold font-['manrope'] text-center text-[#a1a1a1]">
        {servicesText}
      </h1>
      <Center>
        <Box className="flex mt-8 justify-center gap-3 w-[92%]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:p-2  ">
            <ServiceCard
              to="/natalchart/natal-chart"
              src={NatalLogo}
              name={natalChartText}
              heading={natalChartHeading}
              footdesc={natalChartFootdesc}
              image={Natalchart}
              describtion={natalChartDescribtion}
            />
            <ServiceCard
              to="/solar/chart"
              src={NatalMoon}
              name={moonPhaseText}
              heading={moonPhaseHeading}
              footdesc={moonPhaseFootdesc}
              image={SolarReturn}
              describtion={moonPhaseDescribtion}
            />
            <ServiceCard
              to="/synastryPage"
              src={sagittarius}
              name={synastryText}
              heading={synastryHeading}
              footdesc={synastryFootdesc}
              image={compatibility}
              describtion={synastryDescribtion}
            />
            <ServiceCard
              to="/numerology/numerology"
              src={cancer1}
              name={numerologyText}
              heading={numerologyHeading}
              footdesc={numerologyFootdesc}
              image={Numerology}
              describtion={numerologyDescribtion}
            />
            <ServiceCard
              to="/transits/dailytransit"
              src={moon}
              name={dailyTransitText}
              heading={dailyTransitHeading}
              footdesc={dailyTransitFootdesc}
              image={transits}
              describtion={dailyTransitDescribtion}
            />
            <ServiceCard
              to="/tarot"
              src={tarot}
              name={dailyTarotText}
              heading=""
              image={tarotimg}
              describtion={dailyTarotDescribtion}
            />
          </div>
        </Box>
      </Center>
    </div>
  );
};

export default Service;
