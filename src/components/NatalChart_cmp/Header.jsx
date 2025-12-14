import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Divider } from "@chakra-ui/react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const menuTexts = useMemo(
    () => [
      "Natal Chart",
      "Personality",
      "Planet Position",
      "House Cups",
      "Aspects",
      "Sign Report",
      "House Report",
    ],
    []
  );

  const [
    natalChartText,
    personalityText,
    planetPositionText,
    houseCupsText,
    aspectsText,
    signReportText,
    houseReportText,
  ] = useTranslatedTexts(menuTexts);

  const [selectedMenu, setSelectedMenu] = useState(natalChartText);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (text) => {
    setDropdownOpen(false);
    setSelectedMenu(text);
  };

  return (
    <>
      <div className="relative">
        <div className="flex gap-3 w-full text-2xl lg:text-3xl p-3 font-sans text-white">
          <ArrowLeftOutlined
            className="lg:mt-1 mt-2 cursor-pointer"
            onClick={() => navigate("/home")}
          />
          <div className="flex justify-center w-full">
            <h2>{natalChartText}</h2>
          </div>
        </div>

        {/* Mobile dropdown for small devices */}
        <div className="md:hidden relative text-center">
          <button
            className="text-[#48a9a6] border-b-4 font-semibold text-xl border-[#48a9a6] w-fit text-left"
            onClick={handleDropdownToggle}
          >
            <div className="flex gap-2 items-center text-2xl">
              {selectedMenu}{" "}
              {isDropdownOpen ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
            </div>
          </button>
          {isDropdownOpen && (
            <div className="p-2 bg-white absolute left-[40%] top-full flex justify-center flex-col items-center rounded-b-md z-50 transition-all duration-500 ease-in-out">
              <NavLink
                className="block p-2"
                to="natal-chart"
                onClick={() => closeDropdown(natalChartText)}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {natalChartText}
              </NavLink>

              <NavLink
                className="block p-2"
                to="personality"
                onClick={() => closeDropdown(personalityText)}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {personalityText}
              </NavLink>

              <NavLink
                className="block p-2"
                to="planet-position"
                onClick={() => closeDropdown(planetPositionText)}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {planetPositionText}
              </NavLink>

              <NavLink
                className="block p-2"
                to="house-cups"
                onClick={() => closeDropdown(houseCupsText)}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {houseCupsText}
              </NavLink>

              <NavLink
                className="block p-2"
                to="aspects"
                onClick={() => closeDropdown(aspectsText)}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {aspectsText}
              </NavLink>

              <NavLink
                className="block p-2"
                to="sign-report"
                onClick={() => closeDropdown(signReportText)}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {signReportText}
              </NavLink>

              <NavLink
                className="block p-2"
                to="house-report"
                onClick={() => closeDropdown(houseReportText)}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {houseReportText}
              </NavLink>
            </div>
          )}
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:block">
          <div className="mx-auto sm:px-6 lg:px-8 text-2xl md:mt-10">
            <div className="flex items-center justify-center h-16">
              <div className="flex items-center">
                <div className="ms-5">
                  <div className="gap-4 flex items-baseline space-x-4">
                    <NavLink
                      to="natal-chart"
                      onClick={() => closeDropdown(natalChartText)}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {natalChartText}
                    </NavLink>

                    <NavLink
                      to="personality"
                      onClick={() => closeDropdown(personalityText)}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {personalityText}
                    </NavLink>

                    <NavLink
                      to="planet-position"
                      onClick={() => closeDropdown(planetPositionText)}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {planetPositionText}
                    </NavLink>

                    <NavLink
                      to="house-cups"
                      onClick={() => closeDropdown(houseCupsText)}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {houseCupsText}
                    </NavLink>

                    <NavLink
                      to="aspects"
                      onClick={() => closeDropdown(aspectsText)}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {aspectsText}
                    </NavLink>

                    <NavLink
                      to="sign-report"
                      onClick={() => closeDropdown(signReportText)}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {signReportText}
                    </NavLink>

                    <NavLink
                      to="house-report"
                      onClick={() => closeDropdown(houseReportText)}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {houseReportText}
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

export default Header;