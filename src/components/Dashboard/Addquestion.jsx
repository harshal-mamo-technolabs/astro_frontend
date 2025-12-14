import Bg from "../../assets/bgpreloader.jpg";
import { Button, Tag } from "antd";
import { FaPlus } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuestionlist } from "../../context/Question";
const QuestionAdd = () => {
  const { questions, setQuestions } = useQuestionlist();
  const [newQuestion, setNewQuestion] = useState("");
  const [newQuestionType, setNewQuestionType] = useState("text");
  const [newQuestionOptions, setNewQuestionOptions] = useState("");
  const [newQuestionOptionsArray, setNewQuestionOptionsArray] = useState([]);
  const [showOptionsInput, setShowOptionsInput] = useState(false);
  const [addedOptions, setAddedOptions] = useState([]);
  const toast = useToast();

  const handleAddQuestion = () => {
    if (newQuestion.trim() !== "" && newQuestionType.trim() !== "") {
      const newQuestionData = {
        id: Date.now(),
        label: newQuestion,
        type: newQuestionType,
        options: newQuestionOptionsArray,
      };

      setQuestions((prevQuestions) => [...prevQuestions, newQuestionData]);
      localStorage.setItem(
        "questions",
        JSON.stringify([...questions, newQuestionData])
      );
      setNewQuestion("");
      setNewQuestionType("text");
      setNewQuestionOptionsArray([]);
      toast({
        title: "Question added successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Please fill out the question and type.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  console.log(questions, "question added");

  const addOption = () => {
    if (newQuestionOptions.trim() !== "") {
      setNewQuestionOptionsArray((prevOptions) => [
        ...prevOptions,
        newQuestionOptions.trim(),
      ]);
      setAddedOptions([...addedOptions, setNewQuestion]);
      console.log(newQuestionOptionsArray, "que");

      setNewQuestionOptions("");
    }
  };

  return (
    <div>
    

      <div className="flex justify-center items-center bg-red-900">
        <div className="flex justify-evenly flex-wrap  gap-5 w-full">
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
                {/* <option value="select">Select</option> */}
                <option value="time">Time</option>
                <option value="date">Date</option>
              </select>
            </div>

            {(newQuestionType === "radio" || newQuestionType === "select") && (
              <div className="mb-4">
                {newQuestionOptionsArray.map((option, index) => (
                  <Tag
                    key={index}
                    color="cyan"
                    style={{ marginBottom: "8px" }}
                    closable
                    onClose={() => {
                      const updatedOptions = [...newQuestionOptionsArray];
                      updatedOptions.splice(index, 1);
                      setNewQuestionOptionsArray(updatedOptions);
                    }}
                  >
                    {option}
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
                onClick={handleAddQuestion}
              >
                Add Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuestionAdd;
