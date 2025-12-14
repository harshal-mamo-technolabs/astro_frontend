import { useState } from "react";
import Step1 from "./Step1";
// import Step2 from "./Step2";
import Bg from "../../assets/bgpreloader.jpg";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import { useProfile } from "../../context/Profile";
import { Link, useNavigate } from "react-router-dom";
import "../Preloader/Preloader.css";
import TranslationButton from "../TranslationButton/TranslationButton";
import { useTranslation } from "react-i18next";
import Steps from "./Step3";
import { Button } from "antd";
import BirthForm from "./BirthForm";
const Preloader = () => {
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();
  const { formData, setFormData, setSkip } = useProfile();
  const navigate = useNavigate();

  const Handleskip = () => {
    setSkip(true);
    navigate("/home");
  };
  const next = () => {
    setFormData({ ...formData, isAuth: true });
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      content: <Step1 next={next} />,
    },

    {
      content: (
        <Steps
          prev={prev}
          next={next}
          current={current}
          setCurrent={setCurrent}
        />
      ),
    },
    {
      content: (
        <Step4
          setStep4={(value) =>
            setFormData((prev) => ({ ...prev, step4: value }))
          }
          prev={prev}
          setCurrent={setCurrent}
          current={current}
          next={next}
        />
      ),
    },
    {
      content: (
        <Step5
          // setStep5={(value) =>
          //   setFormData((prev) => ({ ...prev, step5: value }))
          // }
          setCurrent={setCurrent}
          current={current}
          prev={prev}
          next={next}
        />
      ),
    },
    {
      content: (
        <Step6
          setStep6={(value) =>
            setFormData((prev) => ({ ...prev, step6: value }))
          }
          prev={prev}
          next={next}
          current={current}
          setCurrent={setCurrent}
        />
      ),
    },
    {
      content: <Step7 />,
    },
  ];

  return (
    <>
      <div
        className=" min-h-screen  items-center justify-center font-nunito-light"
        style={{
          backgroundImage: `url(${Bg})`,
          backgroundSize: "cover",
        }}
      >
        {/* <div className=" min-h-screen flex items-center justify-center font-nunito-light">
          <div className=" flex justify-between items-center  w-full absolute top-2 left-0">
            <div className="m-2">
              <Link to="/dashboard">
                <Button className="text-white">Dashboard</Button>
              </Link>
            </div>
            <div>
              <TranslationButton />
            </div>
          </div>

          <div className="h-[70vh]  w-[100%] lg:w-[70%] m-3">
            {current < 6 && (
              <button className="text-white" onClick={Handleskip}>
                {t("skip")}
              </button>
            )}
            {steps[current].content}
          </div>
        </div> */}
        <BirthForm/>
      </div>
    </>
  );
};
export default Preloader;
// import { useEffect } from "react";

// const Preloader = () => {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "//embed.typeform.com/next/embed.js";
//     script.async = true;
//     document.head.appendChild(script);

//     return () => {
//       // Cleanup script when component unmounts
//       document.head.removeChild(script);
//     };
//   }, []);

//   const containerStyle = {
//     height: "100vh",
//   };

//   return (
//     <div style={containerStyle}>
//       <button className="">Add</button>
//       <div
//         data-tf-live="01HMK8T71BEZEM921GCAA0BZ2S"
//         style={{ height: "100%" }}
//       ></div>
//     </div>
//   );
// };

// export default Preloader;
