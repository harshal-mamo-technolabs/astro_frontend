import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../context/Profile";

const PrivateRoute = ({ Compo }) => {
  const navigate = useNavigate();
  const { formData, setFormData, skip } = useProfile();

  useEffect(() => {
    const formdata = JSON.parse(localStorage.getItem("formData")) || {};
    setFormData(formdata);
    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    if (questions.length === 0) {
      navigate("/subscription");
    }
  }, [setFormData, navigate]);

  return <div>{skip || formData.isAuth ? <Compo /> : navigate("/")}</div>;
};

export default PrivateRoute;
