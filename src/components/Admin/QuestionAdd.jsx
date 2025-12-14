import Bg from "../../assets/bgpreloader.jpg";
import Tarusimg from "../../assets/bull.png";
import ARies from "../../assets/Aries.png";
import Cancer from "../../assets/Cancerlogo.png";
import Gemini from "../../assets/gemini.png";
import Aquarius from "../../assets/aquarius.png";
import Sagittarius from "../../assets/sagittarius.png";
import Leo from "../../assets/leo.png";
import Allquestions from "../Admin/Allquestions";
import { Button, Tag } from "antd";
import { FaPlus } from "react-icons/fa";
import { Box, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useQuestionlist } from "../../context/Question";

const QuestionAdd = () => {
  const { questions, setQuestions } = useQuestionlist();
  const [newQuestion, setNewQuestion] = useState("");
  const [newQuestionType, setNewQuestionType] = useState("text");
  const [newQuestionOptions, setNewQuestionOptions] = useState("");
  const [newQuestionOptionsArray, setNewQuestionOptionsArray] = useState([]);
  const [showOptionsInput, setShowOptionsInput] = useState(false);
  const [addedOptions, setAddedOptions] = useState([]);
  const [zodiacSignOptions, setZodiacSignOptions] = useState([
    { name: "Aries", image: ARies },
    { name: "Taurus", image: Tarusimg },
    { name: "Gemini", image: Gemini },
    { name: "Cancer", image: Cancer },
    { name: "Leo", image: Leo },
    { name: "Aquarius", image: Aquarius },
    { name: "Sagittarius", image: Sagittarius },
  ]);
  useEffect(() => {
    console.log(newQuestionOptionsArray, "updatedquesss");
    localStorage.setItem("options", JSON.stringify(newQuestionOptionsArray));
  }, [addedOptions]);
  const toast = useToast();
  const handleOrderChange = (updatedOrder) => {
    console.log("Updated Order:", updatedOrder);
  };
  const updateQuestionsOptions = (updatedOptions) => {
    const updatedQuestions = questions.map((question) => {
      if (question.label === newQuestion.trim()) {
        return { ...question, options: updatedOptions };
      }
      return question;
    });

    return updatedQuestions;
  };

  const handleDeleteItem = (itemId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== itemId)
    );

    const updatedQuestions = questions.filter(
      (question) => question.id !== itemId
    );
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
    setQuestions(updatedQuestions);
  };

  const handleOptionClose = (index) => {
    const updatedOptions = addedOptions.filter((_, i) => i !== index);
    setAddedOptions(updatedOptions);

    const updatedQuestions = updateQuestionsOptions(updatedOptions);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));

    console.log(updatedOptions, "updatedOptions");
  };

  const addQuestion = () => {
    if (newQuestion.trim() !== "") {
      const newQuestionObject = {
        id: Date.now(),
        label: newQuestion.trim(),
        type: newQuestionType,
        options: addedOptions,
        sign: zodiacSignOptions,
      };

      setQuestions((prevQuestions) => [...prevQuestions, newQuestionObject]);
      setNewQuestion("");
      setNewQuestionOptions("");
      setAddedOptions([]);
      setShowOptionsInput(false);
      localStorage.setItem(
        "questions",
        JSON.stringify([...questions, newQuestionObject])
      );

      toast({
        position: "top",
        duration: 2000,
        render: () => (
          <Box
            color="white"
            p={3}
            className=" bg-custom-gradient font-nunito-light text-center rounded-md"
          >
            Question added
          </Box>
        ),
      });
    }
  };

  const addOption = () => {
    setAddedOptions((prevAddedOptions) => [
      ...prevAddedOptions,
      newQuestionOptions,
    ]);
    setNewQuestionOptions("");
  };

  useEffect(() => {
    console.log(addedOptions, "adoptions");
  }, [addedOptions]);

  return (
    <div
      className="min-h-screen items-center justify-center font-nunito-light"
      style={{ backgroundImage: `url(${Bg})`, backgroundSize: "cover" }}
    >
      <div className="min-h-screen flex flex-col justify-center">
        <div className="absolute top-2 z-10">
          <Link to="/" className="m-2">
            <Button className="text-white">Home</Button>
          </Link>
        </div>

        <div className="flex justify-center items-center ">
          <div className="flex justify-evenly flex-wrap gap-5 w-full">
            <div className="max-w-md p-4 bg-[#1a102e] m-4 w-full flex flex-col gap-2 backdrop-blur-md bg-opacity-70 webkit-backdrop-blur-md rounded-lg text-[#9e9e9f] shadow-md">
              <h1 className="text-2xl font-bold mb-4 text-center">
                Add Question
              </h1>

              <div className="mb-4">
                <label className="block mb-2">New Question</label>
                <input
                  type="text"
                  placeholder="Add question here..."
                  className="border p-2 w-full text-black"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Select Question Type</label>
                <select
                  value={newQuestionType}
                  onChange={(e) => setNewQuestionType(e.target.value)}
                  className="border p-2 w-full"
                >
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="radio">Radio</option>
                  <option value="phone">Phone</option>
                  <option value="sign">Zodiac sign</option>
                  <option value="time">Time</option>
                  <option value="date">Date</option>
                </select>
              </div>

              {(newQuestionType === "radio" ||
                newQuestionType === "select") && (
                <div className="mb-4">
                  {addedOptions?.map((option, index) => (
                    <Tag
                      key={index}
                      color="cyan"
                      style={{ marginBottom: "8px" }}
                    >
                      <div className="flex items-center gap-2">
                        <span> {option}</span>
                        <span>
                          {" "}
                          <RxCross2
                            onClick={() => handleOptionClose(index)}
                            className="cursor-pointer"
                          />
                        </span>
                      </div>
                    </Tag>
                  ))}
                  <input
                    type="text"
                    className="border p-2 w-full text-black"
                    value={newQuestionOptions}
                    placeholder={`Add ${
                      newQuestionType === "radio" ? "option" : "Option"
                    } here...`}
                    onChange={(e) => setNewQuestionOptions(e.target.value)}
                  />

                  <button
                    className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white  rounded-full p-4 m-2"
                    onClick={addOption}
                  >
                    <FaPlus className="text-xl" />
                  </button>
                </div>
              )}

              <div className="flex justify-center">
                <button
                  className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-2 rounded mr-2"
                  onClick={addQuestion}
                >
                  Add Question
                </button>
              </div>
            </div>
            <Allquestions
              questions={questions}
              setQuestions={setQuestions}
              onOrderChange={handleOrderChange}
              deleteItem={handleDeleteItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuestionAdd;
