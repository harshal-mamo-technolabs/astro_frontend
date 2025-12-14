import { useEffect, useState, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Divider } from "@chakra-ui/react";
import { IoIosArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDropup } from "react-icons/io";
import { useTranslatedText, useTranslatedTexts } from "../../hooks/useTranslatedText";

const NumerologyHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedmenu, setSelectedmenu] = useState("Numerology");

  const menuTexts = useMemo(() => [
    "Numerology",
    "Life Path",
    "Personality",
    "Expression",
    "Soul Urge",
    "Subconscious self",
    "personal month number",
    "personal month report"
  ], []);
  
  const translatedMenuTexts = useTranslatedTexts(menuTexts);

  const menuMapping = useMemo(() => ({
    numerology: translatedMenuTexts[0],
    lifepath: translatedMenuTexts[1],
    personality: translatedMenuTexts[2],
    expression: translatedMenuTexts[3],
    soul: translatedMenuTexts[4],
    subconscious: translatedMenuTexts[5],
    report: translatedMenuTexts[6],
  }), [translatedMenuTexts]);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];

    setSelectedmenu(menuMapping[lastSegment] || translatedMenuTexts[0]);
  }, [location.pathname, menuMapping, translatedMenuTexts]);
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
          <div className="flex justify-center w-full me-4 lg:me-0">
            <h2>{translatedMenuTexts[0]}</h2>
          </div>
        </div>

        {/* Mobile dropdown for small devices */}
        <div className="md:hidden flex flex-col m-4 justify-center items-center">
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
            <div className="p-2 bg-white absolute  top-full flex justify-center flex-col items-center rounded-b-md z-50 transition-all duration-500 ease-in-out">
              <NavLink
                className="block p-2"
                to="numerology"
                onClick={() => closeDropdown(translatedMenuTexts[0])}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {translatedMenuTexts[0]}
              </NavLink>

              <NavLink
                className="block p-2"
                to="lifepath"
                onClick={() => closeDropdown(translatedMenuTexts[1])}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {translatedMenuTexts[1]}
              </NavLink>

              <NavLink
                className="block p-2"
                to="personality"
                onClick={() => closeDropdown(translatedMenuTexts[2])}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {translatedMenuTexts[2]}
              </NavLink>

              <NavLink
                className="block p-2"
                to="expression"
                onClick={() => closeDropdown(translatedMenuTexts[3])}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {translatedMenuTexts[3]}
              </NavLink>
              <NavLink
                className="block p-2"
                to="soul"
                onClick={() => closeDropdown(translatedMenuTexts[4])}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {translatedMenuTexts[4]}
              </NavLink>
              <NavLink
                className="block p-2"
                to="subconscious"
                onClick={() => closeDropdown(translatedMenuTexts[5])}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {translatedMenuTexts[5]}
              </NavLink>
              <NavLink
                className="block p-2"
                to="report"
                onClick={() => closeDropdown(translatedMenuTexts[7])}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                {translatedMenuTexts[7]}
                <br />
                {translatedMenuTexts[6].split(" ").slice(-1)[0]}
              </NavLink>
            </div>
          )}
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:block">
          <div className=" mx-auto sm:px-6 lg:px-8 text-2xl md:mt-10">
            <div className="flex items-center justify-center h-16">
              <div className="flex items-center ">
                <div className=" ms-5">
                  <div className=" gap-4 flex items-baseline space-x-4">
                    <NavLink
                      className=""
                      to="numerology"
                      onClick={() => closeDropdown(translatedMenuTexts[0])}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {translatedMenuTexts[0]}
                    </NavLink>

                    {/* Repeat the structure for other NavLink elements */}
                    <NavLink
                      to="lifePath"
                      onClick={() => closeDropdown(translatedMenuTexts[1])}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {translatedMenuTexts[1]}
                    </NavLink>

                    <NavLink
                      to="personality"
                      onClick={() => closeDropdown(translatedMenuTexts[2])}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {translatedMenuTexts[2]}
                    </NavLink>

                    <NavLink
                      to="expression"
                      onClick={() => closeDropdown(translatedMenuTexts[3])}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {translatedMenuTexts[3]}
                    </NavLink>
                    <NavLink
                      to="soul"
                      onClick={() => closeDropdown(translatedMenuTexts[4])}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {translatedMenuTexts[4]}
                    </NavLink>
                    <NavLink
                      to="subconscious"
                      onClick={() => closeDropdown(translatedMenuTexts[5])}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {translatedMenuTexts[5]}
                    </NavLink>
                    <NavLink
                      to="report"
                      onClick={() => closeDropdown(translatedMenuTexts[7])}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      {translatedMenuTexts[7]}
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

export default NumerologyHeader;
