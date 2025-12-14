import { useEffect, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Divider } from "@chakra-ui/react";
import { IoIosArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDropup } from "react-icons/io";
import "../More_detail/Scrollbar.css";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const SignHeader = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const menuTexts = useMemo(() => [
    "Annual Horoscope",
    "Happiness",
    "Career",
    "Children's",
    "Erotic",
    "Fashion",
    "Financial",
    "Gift",
    "Health",
    "Senior",
    "Partner",
    "Single"
  ], []);

  const [
    annualHoroscopeText,
    happinessText,
    careerText,
    childrensText,
    eroticText,
    fashionText,
    financialText,
    giftText,
    healthText,
    seniorText,
    partnerText,
    singleText
  ] = useTranslatedTexts(menuTexts);

  const [selectedmenu, setSelectedmenu] = useState(annualHoroscopeText);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const lastPathSegment = pathSegments[pathSegments.length - 1];

    // Check if the last part of the path ends with a specific string
    if (lastPathSegment.endsWith("health")) {
      setSelectedmenu(healthText);
    } else if (lastPathSegment.endsWith("happiness")) {
      setSelectedmenu(happinessText);
    } else if (lastPathSegment.endsWith("career")) {
      setSelectedmenu(careerText);
    } else if (lastPathSegment.endsWith("children")) {
      setSelectedmenu(childrensText);
    } else if (lastPathSegment.endsWith("partner")) {
      setSelectedmenu(partnerText);
    } else if (lastPathSegment.endsWith("erotic")) {
      setSelectedmenu(eroticText);
    } else if (lastPathSegment.endsWith("fashion")) {
      setSelectedmenu(fashionText);
    } else if (lastPathSegment.endsWith("financial")) {
      setSelectedmenu(financialText);
    } else if (lastPathSegment.endsWith("gift")) {
      setSelectedmenu(giftText);
    } else if (lastPathSegment.endsWith("senior")) {
      setSelectedmenu(seniorText);
    } else if (lastPathSegment.endsWith("single")) {
      setSelectedmenu(singleText);
    } else if (lastPathSegment.endsWith("annual")) {
      setSelectedmenu(annualHoroscopeText);
    }
  }, [location.pathname, healthText, happinessText, careerText, childrensText, partnerText, eroticText, fashionText, financialText, giftText, seniorText, singleText, annualHoroscopeText]);
  const closeDropdown = (text) => {
    setDropdownOpen(false);
    setSelectedmenu(text);
  };

  return (
    <>
      <div className="relative">
        <div className="flex gap-3 w-full text-2xl lg:text-3xl p-3  font-sans text-white">
          <ArrowLeftOutlined
            className="lg:mt-1 mt-2 cursor-pointer"
            onClick={() => navigate("/home")}
          />
          {/* <div className="flex justify-center w-full">
            <h2>Zodiac sign</h2>
          </div> */}
        </div>

        {/* Mobile dropdown for small devices */}
        <div className="md:hidden flex flex-col justify-center items-center">
          <button
            className="text-[#48a9a6] border-b-4 font-semibold text-xl border-[#48a9a6] w-fit text-left"
            onClick={handleDropdownToggle}
          >
            <div className="flex gap-2 items-center text-2xl">
              {selectedmenu}{" "}
              {isDropdownOpen ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
            </div>
          </button>
          {isDropdownOpen && (
            <div className="p-2 bg-white h-fit overflow-auto absolute top-full w-fit rounded-b-md z-50 transition-all duration-500 ease-in-out">
              <NavLink
                className="block p-2"
                to="annual"
                onClick={() => closeDropdown(annualHoroscopeText)}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {annualHoroscopeText}
              </NavLink>

              <NavLink
                className="block p-2"
                to="happiness"
                onClick={() => closeDropdown(happinessText)}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {happinessText}
              </NavLink>

              <NavLink
                className="block p-2"
                to="career"
                onClick={() => closeDropdown(careerText)}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {careerText}
              </NavLink>
              <NavLink
                className="block p-2"
                to="children"
                onClick={() => closeDropdown(childrensText)}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {childrensText}
              </NavLink>
              {/* <NavLink
                className="block p-2"
                to="luck"
                onClick={() => closeDropdown("Luck")}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                Luck
              </NavLink> */}

              {/* <NavLink
                className="block p-2"
                to="partner"
                onClick={() => closeDropdown("Partner")}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                Partner
              </NavLink> */}
              <NavLink
                className="block p-2"
                to="erotic"
                onClick={() => closeDropdown(eroticText)}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {eroticText}
              </NavLink>
              <NavLink
                className="block p-2"
                to="fashion"
                onClick={() => closeDropdown(fashionText)}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {fashionText}
              </NavLink>
              <NavLink
                className="block p-2"
                to="financial"
                onClick={() => closeDropdown(financialText)}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {financialText}
              </NavLink>
              <NavLink
                className="block p-2"
                to="gift"
                onClick={() => closeDropdown(giftText)}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {giftText}
              </NavLink>
              <NavLink
                className="block p-2"
                to="health"
                onClick={() => closeDropdown(healthText)}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {healthText}
              </NavLink>
              <NavLink
                className="block p-2"
                to="senior"
                onClick={() => closeDropdown(seniorText)}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {seniorText}
              </NavLink>
              {/* <NavLink
                className="block p-2"
                to="love"
                onClick={() => closeDropdown("Love")}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                Love
              </NavLink> */}

              <NavLink
                className="block p-2"
                to="partner"
                onClick={() => closeDropdown(partnerText)}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {partnerText}
              </NavLink>
              <NavLink
                className="block p-2"
                to="single"
                onClick={() => closeDropdown(singleText)}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {singleText}
              </NavLink>
            </div>
          )}
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:block w-[100%]  scroll-container">
          <div className=" text-2xl md:mt-10">
            <div className="lg:flex items-center justify-center m-2">
              <div className="flex items-center ">
                <div className="">
                  <div className="gap-1  flex items-baseline  space-x-4">
                    <NavLink
                      className=" "
                      to="annual"
                      onClick={() => closeDropdown(annualHoroscopeText)}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {annualHoroscopeText}
                    </NavLink>

                    <NavLink
                      to="happiness"
                      onClick={() => closeDropdown(happinessText)}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {happinessText}
                    </NavLink>

                    <NavLink
                      to="career"
                      onClick={() => closeDropdown(careerText)}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {careerText}
                    </NavLink>

                    <NavLink
                      to="children"
                      onClick={() => closeDropdown(childrensText)}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {childrensText}
                    </NavLink>
                    <NavLink
                      to="erotic"
                      onClick={() => closeDropdown(eroticText)}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {eroticText}
                    </NavLink>
                    <NavLink
                      to="fashion"
                      onClick={() => closeDropdown(fashionText)}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {fashionText}
                    </NavLink>
                    <NavLink
                      to="financial"
                      onClick={() => closeDropdown(financialText)}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {financialText}
                    </NavLink>
                    <NavLink
                      to="gift"
                      onClick={() => closeDropdown(giftText)}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {giftText}
                    </NavLink>
                    <NavLink
                      to="health"
                      onClick={() => closeDropdown(healthText)}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {healthText}
                    </NavLink>
                    <NavLink
                      to="senior"
                      onClick={() => closeDropdown(seniorText)}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {seniorText}
                    </NavLink>
                    {/* <NavLink
                      to="love"
                      onClick={() => closeDropdown("Love")}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      Love
                    </NavLink> */}

                    <NavLink
                      to="partner"
                      onClick={() => closeDropdown(partnerText)}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {partnerText}
                    </NavLink>
                    <NavLink
                      to="single"
                      onClick={() => closeDropdown(singleText)}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {singleText}
                    </NavLink>
                  </div>
                  <div className={` `}>
                    <Divider className="relative bottom-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default SignHeader;