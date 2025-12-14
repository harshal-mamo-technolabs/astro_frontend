import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../context/Profile";

const Step7 = () => {
  const navigate = useNavigate();
  const { formData } = useProfile();
  localStorage.setItem("formData", JSON.stringify(formData));

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/subscription");
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <>
      <div className="h-[35vh] flex flex-col  text-center gap-5  font-[helvetica]">
        <h1 className="lg:text-4xl md:text-4xl text-2xl">
          Your birth chart is being calculated
        </h1>
        <p className="md:text-2xl lg:text-2xl">Please wait...</p>
      </div>
    </>
  );
};

export default Step7;
