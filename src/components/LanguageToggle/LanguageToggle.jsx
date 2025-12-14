import { Box, Button, Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";
import { FaLanguage, FaCheck } from "react-icons/fa";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useTranslation } from "../../context/TranslationContext";

const FlagIcon = ({ code }) => {
  const flags = {
    en: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="18">
        <clipPath id="s">
          <path d="M0,0 v30 h60 v-30 z"/>
        </clipPath>
        <clipPath id="t">
          <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
        </clipPath>
        <g clipPath="url(#s)">
          <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
        </g>
      </svg>
    ),
    ro: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="18">
        <rect width="20" height="30" fill="#002B7F"/>
        <rect x="20" width="20" height="30" fill="#FCD116"/>
        <rect x="40" width="20" height="30" fill="#CE1126"/>
      </svg>
    ),
    de: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="18">
        <rect width="60" height="30" fill="#000"/>
        <rect width="60" height="20" y="10" fill="#D00"/>
        <rect width="60" height="10" y="20" fill="#FFCE00"/>
      </svg>
    ),
  };
  return flags[code] || null;
};

const LanguageToggle = ({ isMobile = false, isSimpleButton = false }) => {
  const { currentLanguage, changeLanguage } = useTranslation();

  const languages = [
    { code: "en", label: "EN", name: "ENGLISH" },
    { code: "ro", label: "RO", name: "ROMÂNĂ" },
    { code: "de", label: "DE", name: "DEUTSCH" },
  ];

  const currentLang = languages.find((lang) => lang.code === currentLanguage) || languages[0];

  if (isSimpleButton) {
    return (
        <Menu>
          <MenuButton
            as={Button}
            bg="transparent"
            color="white"
            size="md"
            cursor="pointer"
            className="flex items-center gap-1.5 shadow-lg transition-all"
            // _hover={{ bg: "#a83de8", transform: "scale(1.05)", boxShadow: "xl" }}
            // _active={{ bg: "#7a1fb8" }}
            _focus={{ boxShadow: "outline" }}
            borderRadius="full"
            px={3}
            py={2}
            h="50px"
            minW="auto"
            border="2px solid #7a1fb8"
          >
          <Box display="flex" alignItems="center" gap={1.5}>
            {/* <FlagIcon code={currentLang.code} /> */}
            <span className="font-nunito-light font-bold text-sm leading-none">
              {currentLang.label}
            </span>
            <ChevronDownIcon className="text-base" />
          </Box>
        </MenuButton>
        <MenuList
          bg="white"
          border="1px solid rgba(0, 0, 0, 0.1)"
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.15)"
          minW="200px"
          borderRadius="lg"
          mt={2}
          py={2}
        >
          {languages.map((lang) => (
            <MenuItem
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              bg="transparent"
              _hover={{ bg: "rgba(147, 38, 219, 0.1)" }}
              color="#333"
              py={3}
              px={4}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box className="flex items-center gap-3">
                <FlagIcon code={lang.code} />
                <Text className="font-nunito-light font-semibold text-sm">
                  {lang.name}
                </Text>
              </Box>
              {currentLanguage === lang.code && (
                <FaCheck className="text-green-500 text-sm" />
              )}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  }

  if (isMobile) {
    return (
        <Menu>
          <MenuButton
            as={Button}
            bg="#9326DB"
            color="white"
            size="md"
            cursor="pointer"
            className="flex items-center gap-1.5 shadow-lg transition-all"
            _hover={{ bg: "#a83de8", transform: "scale(1.05)" }}
            _active={{ bg: "#7a1fb8" }}
            _focus={{ boxShadow: "outline" }}
            borderRadius="full"
            px={3}
            py={2}
            h="50px"
            minW="auto"
            border="2px solid #7a1fb8"
          >
          <Box display="flex" alignItems="center" gap={1.5}>
            <FlagIcon code={currentLang.code} />
            <span className="font-nunito-light font-bold text-sm leading-none">
              {currentLang.label}
            </span>
            <ChevronDownIcon className="text-base" />
          </Box>
        </MenuButton>
        <MenuList
          bg="white"
          border="1px solid rgba(0, 0, 0, 0.1)"
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.15)"
          minW="200px"
          borderRadius="lg"
          mt={2}
          py={2}
        >
          {languages.map((lang) => (
            <MenuItem
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              bg="transparent"
              _hover={{ bg: "rgba(147, 38, 219, 0.1)" }}
              color="#333"
              py={3}
              px={4}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box className="flex items-center gap-3">
                <FlagIcon code={lang.code} />
                <Text className="font-nunito-light font-semibold text-sm">
                  {lang.name}
                </Text>
              </Box>
              {currentLanguage === lang.code && (
                <FaCheck className="text-green-500 text-sm" />
              )}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        bg="#9326DB"
        color="white"
        size="md"
        className="flex items-center gap-2 font-semibold shadow-md hover:shadow-lg transition-shadow"
        _hover={{ bg: "#a83de8", transform: "scale(1.05)" }}
        _active={{ bg: "#7a1fb8" }}
        _focus={{ boxShadow: "outline" }}
        borderRadius="md"
        px={4}
        py={2}
        rightIcon={<ChevronDownIcon />}
      >
        <FaLanguage className="text-lg" />
        <span className="font-nunito-light font-semibold">
          {currentLang.label}
        </span>
      </MenuButton>
      <MenuList
        bg="rgba(26, 16, 46, 0.95)"
        border="1px solid rgba(255, 255, 255, 0.2)"
        minW="180px"
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            bg={currentLanguage === lang.code ? "rgba(147, 38, 219, 0.3)" : "transparent"}
            _hover={{ bg: "rgba(147, 38, 219, 0.2)" }}
            color="white"
            py={2}
          >
            <Text className="font-nunito-light">
              {lang.name} ({lang.label})
            </Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageToggle;

