import { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";
//import { Divider } from "@chakra-ui/react";
//import { IoIosArrowDropdown } from "react-icons/io";
//import { IoIosArrowDropup } from "react-icons/io";

const SynastryHeader = () => {
  //const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedmenu, setSelectedmenu] = useState("chart");

  const navigate = useNavigate();
  const location = useLocation();

  const menuTexts = useMemo(() => [
    "Chart",
    "Planets",
    "Aspects",
    "House Cusps",
    "Harmonious",
    "Conflicting",
    "Contrasting",
    "Intense",
    "Physical",
    "Emotional",
    "Sexual",
    "Financial"
  ], []);

  const [chartText, planetsText, aspectsText, houseCuspsText, harmoniousText, conflictingText, contrastingText, intenseText, physicalText, emotionalText, sexualText, financialText] = useTranslatedTexts(menuTexts);

  // Sync the dropdown selection with the current URL segment
  useEffect(() => {
    const parts = location.pathname.split("/");
    const current = parts[4] || "chart"; // /synastrypage/partner/:id/:segment
    if (current !== selectedmenu) {
      setSelectedmenu(current);
    }
  }, [location.pathname]);
/*
  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (text) => {
    setDropdownOpen(false);
    setSelectedmenu(text);
  };
*/
  return (
    <>
      {/*<div className="relative justify-center">
         Mobile dropdown for small devices */}
      {/*  <div className="md:hidden relative text-center">
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
            <div className="p-2 bg-white text-xl absolute left-[30%] w-[150px] top-full flex justify-center flex-col items-center rounded-b-md z-50 transition-all duration-500 ease-in-out">
              <NavLink
                className="block p-2"
                to="chart"
                onClick={() => closeDropdown("Chart")}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                Chart
              </NavLink>

              <NavLink
                className="block p-2"
                to="planets"
                onClick={() => closeDropdown("Planets")}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                Planets
              </NavLink>

              <NavLink
                className="block p-2"
                to="aspects"
                onClick={() => closeDropdown("Aspects")}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                Aspects
              </NavLink>

              <NavLink
                className="block p-2"
                to="housecusps"
                onClick={() => closeDropdown("House Cusps")}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                House Cusps
              </NavLink>

              <NavLink
                className="block p-2"
                to="report"
                onClick={() => closeDropdown("Report")}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                Harmonious
              </NavLink>

              <NavLink
                className="block p-2"
                to="conflicting"
                onClick={() => closeDropdown("Conflicting")}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                Conflicting
              </NavLink>

              <NavLink
                className="block p-2"
                to="contrasting"
                onClick={() => closeDropdown("Contrasting")}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                Contrasting
              </NavLink>

              <NavLink
                className="block p-2"
                to="intense"
                onClick={() => closeDropdown("Intense")}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                Intense
              </NavLink>

              <NavLink
                className="block p-2"
                to="physical"
                onClick={() => closeDropdown("Physical")}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                Physical
              </NavLink>

              <NavLink
                className="block p-2"
                to="emotional"
                onClick={() => closeDropdown("Emotional")}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                Emotional
              </NavLink>

              <NavLink
                className="block p-2"
                to="sexual"
                onClick={() => closeDropdown("Sexual")}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                Sexual
              </NavLink>
            </div>
          )}
        </div>
        */}
    <div className="w-full flex justify-center mt-4">
  <select
    value={selectedmenu}
    onChange={(e) => {
      const selected = e.target.value;
      setSelectedmenu(selected);

      const basePath = location.pathname.split("/").slice(0, 4).join("/");
      navigate(`${basePath}/${selected}`);
    }}
    className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 py-2 rounded-md border text-white bg-[#551d91]"
  >
    <option value="chart">{chartText}</option>
    <option value="planets">{planetsText}</option>
    <option value="aspects">{aspectsText}</option>
    <option value="housecusps">{houseCuspsText}</option>
    <option value="report">{harmoniousText}</option>
    <option value="conflicting">{conflictingText}</option>
    <option value="contrasting">{contrastingText}</option>
    <option value="intense">{intenseText}</option>
    <option value="physical">{physicalText}</option>
    <option value="emotional">{emotionalText}</option>
    <option value="sexual">{sexualText}</option>
    <option value="financial">{financialText}</option>
  </select>

        {/* Desktop navigation 
        <nav className="hidden md:block">
          <div className="flex justify-center">
            <div className="flex justify-center flex-col ">
              <div className="text-2xl gap-6 flex justify-center items-baseline space-x-4 ">
                <NavLink
                  className=""
                  to="chart"
                  onClick={() => closeDropdown("Chart")}
                  style={({ isActive }) => ({
                    color: isActive ? "#48a9a6" : "white",
                    borderBottom: isActive ? "2px solid #48a9a6" : null,
                    fontWeight: isActive && "bold",
                  })}
                >
                  Chart
                </NavLink>

                <NavLink
                  to="planets"
                  onClick={() => closeDropdown("Planets")}
                  style={({ isActive }) => ({
                    color: isActive ? "#48a9a6" : "white",
                    borderBottom: isActive ? "2px solid #48a9a6" : null,
                    fontWeight: isActive && "bold",
                  })}
                >
                  Planets
                </NavLink>

                <NavLink
                  to="aspects"
                  onClick={() => closeDropdown("Aspects")}
                  style={({ isActive }) => ({
                    color: isActive ? "#48a9a6" : "white",
                    borderBottom: isActive ? "2px solid #48a9a6" : null,
                    fontWeight: isActive && "bold",
                  })}
                >
                  Aspects
                </NavLink>

                <NavLink
                  to="housecusps"
                  onClick={() => closeDropdown("House Cusps")}
                  style={({ isActive }) => ({
                    color: isActive ? "#48a9a6" : "white",
                    borderBottom: isActive ? "2px solid #48a9a6" : null,
                    fontWeight: isActive && "bold",
                  })}
                >
                  House Cusps
                </NavLink>

                <NavLink
                  to="report"
                  onClick={() => closeDropdown("Report")}
                  style={({ isActive }) => ({
                    color: isActive ? "#48a9a6" : "white",
                    borderBottom: isActive ? "2px solid #48a9a6" : null,
                    fontWeight: isActive && "bold",
                  })}
                >
                  Harmonious
                </NavLink>

                <NavLink
                  to="conflicting"
                  onClick={() => closeDropdown("Conflicting")}
                  style={({ isActive }) => ({
                    color: isActive ? "#48a9a6" : "white",
                    borderBottom: isActive ? "2px solid #48a9a6" : null,
                    fontWeight: isActive && "bold",
                  })}
                >
                  Conflicting
                </NavLink>

                <NavLink
                  to="contrasting"
                  onClick={() => closeDropdown("Contrasting")}
                  style={({ isActive }) => ({
                    color: isActive ? "#48a9a6" : "white",
                    borderBottom: isActive ? "2px solid #48a9a6" : null,
                    fontWeight: isActive && "bold",
                  })}
                >
                  Contrasting
                </NavLink>

                <NavLink
                  to="intense"
                  onClick={() => closeDropdown("Intense")}
                  style={({ isActive }) => ({
                    color: isActive ? "#48a9a6" : "white",
                    borderBottom: isActive ? "2px solid #48a9a6" : null,
                    fontWeight: isActive && "bold",
                  })}
                >
                  Intense
                </NavLink>

                <NavLink
                  to="physical"
                  onClick={() => closeDropdown("Physical")}
                  style={({ isActive }) => ({
                    color: isActive ? "#48a9a6" : "white",
                    borderBottom: isActive ? "2px solid #48a9a6" : null,
                    fontWeight: isActive && "bold",
                  })}
                >
                  Physical
                </NavLink>

                <NavLink
                  to="emotional"
                  onClick={() => closeDropdown("Emotional")}
                  style={({ isActive }) => ({
                    color: isActive ? "#48a9a6" : "white",
                    borderBottom: isActive ? "2px solid #48a9a6" : null,
                    fontWeight: isActive && "bold",
                  })}
                >
                  Emotional
                </NavLink>

                <NavLink
                  to="sexual"
                  onClick={() => closeDropdown("Sexual")}
                  style={({ isActive }) => ({
                    color: isActive ? "#48a9a6" : "white",
                    borderBottom: isActive ? "2px solid #48a9a6" : null,
                    fontWeight: isActive && "bold",
                  })}
                >
                  Sexual
                </NavLink>
              </div>
              <Divider />
            </div>
          </div>
        </nav> */}
      </div>
    </>
  );
};

export default SynastryHeader;