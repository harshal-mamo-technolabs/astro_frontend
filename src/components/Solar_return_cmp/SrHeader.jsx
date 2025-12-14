import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const SrHeader = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="font-sans">
        <div className="flex gap-3 w-full text-2xl lg:text-3xl p-3 font-sans text-white">
          <ArrowLeftOutlined
            className="lg:mt-1 mt-2 cursor-pointer"
            onClick={() => navigate("/home")}
          />
        </div>


        {/*
        <div className="flex justify-center w-full me-4 ">
          <h2>Solar Return</h2>
        </div>

        <div className="md:hidden relative text-center">
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
            <div className="p-2 bg-white absolute top-full left-[140px] w-[100px] rounded-b-md z-50 transition-all duration-500 ease-in-out">
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
                to="Planets"
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
                to="houses"
                onClick={() => closeDropdown("Houses")}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                Houses
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
                to="report"
                onClick={() => closeDropdown("Report")}
                style={({ isActive }) => ({
                  color: isActive ? "#48a9a6" : "black",
                  fontWeight: isActive && "bold",
                })}
              >
                Report
              </NavLink>
            </div>
          )}
        </div>

        <nav className="hidden md:block">
          <div className=" mx-auto sm:px-6 lg:px-8 text-2xl md:mt-10">
            <div className="flex items-center justify-center h-16">
              <div className="flex items-center ">
                <div className=" ms-5">
                  <div className=" gap-4 flex items-baseline space-x-4">
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
                      to="Houses"
                      onClick={() => closeDropdown("Houses")}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      Houses
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
                      to="report"
                      onClick={() => closeDropdown("Report")}
                      style={({ isActive }) => ({
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                        fontWeight: isActive && "bold",
                      })}
                    >
                      Report
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
        */}
      </div>
    </>
  );
};

export default SrHeader;