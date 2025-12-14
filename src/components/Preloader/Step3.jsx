import { useState, useEffect } from "react";
import validator from "validator";
import { Input } from "antd";
import { AiOutlineLeft } from "react-icons/ai";
import Step7 from "./Step7";
import Step1 from "./Step1";
import { Box, Radio, RadioGroup, useToast } from "@chakra-ui/react";
const Steps = ({ setcurrent, current }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [textValue, setTextValue] = useState("");
  const [numberValue, setNumberValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const [answers, setAnswers] = useState([]);
  const [showStep1, setShowStep1] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem("questions"));
    if (storedQuestions && storedQuestions.length > 0) {
      setQuestions(storedQuestions);
    }
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const handleInputChange = (e) => {
    const { value, type } = e.target;

    switch (type) {
      case "text":
        setTextValue(value);
        break;
      case "number":
        setNumberValue(value);
        break;
      case "select-one":
        setSelectValue(value);
        break;
      case "email":
        setEmailValue(value);

        break;
      case "tel":
        setPhoneValue(value);
        break;
      case "time":
        setTimeValue(value);
        break;
      case "date":
        setDateValue(value);
        break;
      default:
        break;
    }
  };

  const handleRadioChange = (value) => {
    setRadioValue(value);
  };

  const handleclick = (signs) => {
    setSelectedCard(signs);
  };

  const resetInputValues = () => {
    setTextValue("");
    setNumberValue("");
    setSelectValue("");
    setEmailValue("");
    setPhoneValue("");
    setRadioValue("");
    setTimeValue("");
    setDateValue("");
    setSelectedCard(null);
  };

  const nextQuestion = async () => {
    const inputValue = (() => {
      switch (currentQuestion.type) {
        case "text":
          return textValue;
        case "number":
          return numberValue;
        case "select":
          return selectValue;
        case "email":
          return emailValue;
        case "phone":
          return phoneValue;
        case "radio":
          return radioValue;
        case "time":
          return timeValue;
        case "date":
          return dateValue;
        case "sign":
          return selectedCard;
        default:
          return "";
      }
    })();
    if (!inputValue) {
      toast({
        position: "top",
        duration: 2000,
        render: () => (
          <Box
            color="white"
            p={3}
            className="bg-custom-gradient font-nunito-light text-center rounded-md"
          >
            {currentQuestion.type === "sign"
              ? "  Please select a sign"
              : "All feilds are required"}
          </Box>
        ),
      });
      return;
    }

    if (currentQuestion.type === "email" && !validator.isEmail(inputValue)) {
      toast({
        position: "top",
        duration: 2000,
        render: () => (
          <Box
            color="white"
            p={3}
            className="bg-custom-gradient font-nunito-light text-center rounded-md"
          >
            Invalid email format
          </Box>
        ),
      });
      return;
    }

    const answerObject = {
      label: currentQuestion.label,
      ans: inputValue,
    };

    console.log("Answer:", answerObject);

    setAnswers((prevAnswers) => [...prevAnswers, answerObject]);

    console.log("All Answers:", answers);

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    resetInputValues();
  };
  const prevQuestion = () => {
    if (currentQuestionIndex === 0) {
      setShowStep1(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => Math.max(0, prevIndex - 1));
      resetInputValues();
    }
  };
  return (
    <>
      {showStep1 ? (
        <Step1 />
      ) : (
        <>
          {questions.length > 0 && (
            <div className="bg-[#1a102e] backdrop-blur-md bg-opacity-70  webkit-backdrop-blur-md rounded-lg text-[#9e9e9f] font-nunito-light p-2">
              {currentQuestionIndex >= 0 && (
                <span
                  className="flex items-center gap-3 text-2xl text-[#9e9e9f] font-nunito-light cursor-pointer "
                  onClick={prevQuestion}
                >
                  <AiOutlineLeft className="mt-1 " />
                  <h3>BACK</h3>
                </span>
              )}

              <div className="flex flex-col justify-center items-center gap-4 mt-10">
                <h1 className="lg:text-4xl md:text-4xl text-2xl font-['Times New Roman']">
                  {currentQuestion?.label}
                </h1>
                <p className="text-lg">{currentQuestion?.additionalText}</p>
                <div className="mb-5 lg:mt-4 w-full  font-[helvetica]">
                  {currentQuestion?.type === "text" && (
                    <div className="flex justify-center">
                      <div className="flex justify-center w-[70%] lg:w-[60%]">
                        <Input
                          variant="outline"
                          placeholder="Type your answer here..."
                          value={textValue}
                          onChange={handleInputChange}
                          className="bg-transparent placeholder:text-[#9e9e9f] text-white p-2  w-[70%]"
                        />
                      </div>
                    </div>
                  )}
                  {currentQuestion?.type === "number" && (
                    <div className="flex justify-center ">
                      <Input
                        variant="outline"
                        type="number"
                        value={numberValue}
                        onChange={handleInputChange}
                        placeholder=""
                        className="bg-transparent placeholder:text-[#9e9e9f] text-white p-2  w-[70%] "
                      />
                    </div>
                  )}

                  {currentQuestion?.type === "email" && (
                    <div className="flex justify-center">
                      <div className="flex justify-center w-[90%] lg:w-[60%]">
                        <Input
                          variant="outline"
                          type="email"
                          required
                          value={emailValue}
                          onChange={handleInputChange}
                          placeholder="Enter your email..."
                          className="border-b-2 border-indigo-500 p-2 text-white bg-transparent placeholder:text-[#9e9e9f] w-[70%]"
                        />
                      </div>
                    </div>
                  )}
                  {currentQuestion?.type === "phone" && (
                    <div className="flex justify-center">
                    <div className="flex justify-center w-[70%] lg:w-[60%]">
                      <Input
                        type="tel"
                        placeholder="Phone number"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        value={phoneValue}
                        onChange={handleInputChange}
                        className="bg-transparent placeholder:text-[#9e9e9f] text-white p-2 w-[70%]"
                      />
                      </div>
                    </div>
                  )}
                  {currentQuestion?.type === "sign" && (
                    <div className="flex justify-center overflow-x-auto   gap-2 p-2 w-full ">
                      {currentQuestion?.sign?.map((item) => (
                        <div
                          key={item?.name}
                          onClick={() => handleclick(item)}
                          className={`flex-none text-white ${
                            selectedCard === item
                              ? "border-2 border-indigo-500"
                              : ""
                          }  p-3 bg-[#29286c] min-w-[100px] rounded-md cursor-pointer hover:-translate-y-2 `}
                        >
                          <img
                            src={item?.image}
                            alt={item?.name}
                            className=" h-[55px] lg:h-[100px]"
                            style={{
                              WebkitFilter: "grayscale(1) invert(1)",
                              filter: "brightness(0) invert(1)",
                            }}
                          />

                          <p className="text-center">{item?.name}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {currentQuestion?.type === "radio" && (
                    <RadioGroup
                      onChange={handleRadioChange}
                      value={radioValue}
                      className=" flex justify-center gap-4 "
                    >
                      {currentQuestion?.options.map((option) => (
                        <Radio key={option} value={option}>
                          <p className="text-xl">{option}</p>
                        </Radio>
                      ))}
                    </RadioGroup>
                  )}

                  {currentQuestion?.type === "time" && (
                    <div className="flex justify-center">
                    <div className="flex justify-center w-[70%] lg:w-[60%]">
                      <input
                        type="time"
                        value={timeValue}
                        onChange={handleInputChange}
                        placeholder="Select time..."
                        className="border-b-2 border-indigo-500 p-2 text-white bg-transparent placeholder:text-[#9e9e9f] w-[70%]"
                      />
                    </div>
                    </div>
                  )}
                  {currentQuestion?.type === "date" && (
                   <div className="flex justify-center">
                   <div className="flex justify-center w-[70%] lg:w-[60%]">
                      <input
                        type="date"
                        value={dateValue}
                        onChange={handleInputChange}
                        placeholder="Select time..."
                        className="border-b-2 border-indigo-500 p-2 text-white bg-transparent placeholder:text-[#9e9e9f] w-[70%]"
                      />
                    </div>
                    </div>
                  )}
                </div>

                {currentQuestion && (
                  <button
                    className={`w-[30%] rounded-full text-white font-light m-3 text-xl p-1 lg:p-4 font-[helvetica] bg-gradient-to-r from-purple-600 to-indigo-700`}
                    onClick={nextQuestion}
                  >
                    Next
                  </button>
                )}
              </div>
              <div>
                {currentQuestionIndex === questions.length && <Step7 />}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Steps;
