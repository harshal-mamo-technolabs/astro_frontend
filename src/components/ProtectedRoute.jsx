// import { useContext } from "react";
// import { CardContext } from "../context/CardsDataContext";
// import { useNavigate } from "react-router-dom";
// import { message } from "antd";

// const ProtectedRoute = ({ Compo }) => {
//   const { fullprofile } = useContext(CardContext);
//   const navigate = useNavigate();
//   if (!fullprofile?.name) {
//     message.error("Please Login Your Account First");
//     navigate("/login");
//   }
//   return (
//     <div>
//       <Compo />
//     </div>
//   );
// };

// export default ProtectedRoute;
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { message } from "antd";

const ProtectedRoute = ({ Compo }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const cookieExists = checkCookie();

    // if (!cookieExists) {
    //   message.error("Please Login Your Account First");
    //   navigate("/login");
    // }
  }, [navigate, location]);

  const checkCookie = () => {
    return document.cookie.includes("ASTRO_SESSION");
  };

  return <Compo />;
};

export default ProtectedRoute;
