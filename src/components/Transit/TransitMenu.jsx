import { Divider } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";

const TransitMenu = () => {
  const navigate = useNavigate();
  return (
    <div>
      <nav>
        {/* <div className="max-w-7xl  mx-auto sm:px-6 lg:px-8 text-2xl md:mt-10">
          <div className="flex items-center justify-center  h-16">
            <div className="flex items-center overflow-x-scroll lg:overflow-auto w-[90%]">
              <div className=" lg:ms-32 ms-5">
                <div className=" gap-4 flex items-baseline space-x-4">
                  <NavLink
                    className="w-[8rem]"
                    to="dailytransit"
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                      };
                    }}
                  >
                    Daily Transit
                  </NavLink>

                  <NavLink
                    to="sds"
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "#48a9a6" : "white",
                        borderBottom: isActive ? "2px solid #48a9a6" : null,
                      };
                    }}
                  >
                    Life forecast report
                  </NavLink>
                </div>
                <div className={` `}>
                  <Divider className="relative bottom-0" />
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="flex justify-center">
          <div className=" ">
            <div className="text-xl lg:text-2xl lg:gap-20 gap-6 flex justify-center justify-between">
              {/* <NavLink
                className=""
                to="dailytransit"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#48a9a6" : "white",
                    borderBottom: isActive ? "2px solid #48a9a6" : null,
                    fontWeight: isActive && "bold",

                  };
                }}
              >
                Daily Transit
              </NavLink> */}

              {/* <NavLink
                to="forecast"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#48a9a6" : "white",
                    borderBottom: isActive ? "2px solid #48a9a6" : null,
                    fontWeight: isActive && "bold",

                  };
                }}
              >
                Life forecast report
              </NavLink> */}
            </div>
            <div className={``}>
              <Divider className="relative bottom-0" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TransitMenu;
