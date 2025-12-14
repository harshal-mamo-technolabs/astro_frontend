import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableItem from "../Admin/DraggableItem";
import { useEffect } from "react";
import { useQuestionlist } from "../../context/Question";

const DraggableList = ({ onOrderChange }) => {
  const { questions, setQuestions } = useQuestionlist();
  const moveItem = async (fromIndex, toIndex) => {
    const newItems = [...questions];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    setQuestions(newItems);
    onOrderChange(newItems);
    localStorage.setItem("questions", JSON.stringify(newItems));
  };
  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem("questions"));
    setQuestions(storedQuestions || []);
  }, []);

  const Handledelete = (id) => {
    const newQuestions = questions?.filter((q) => q.id !== id);
    setQuestions(newQuestions);
    localStorage.setItem("questions", JSON.stringify(newQuestions));
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={`bg-[#1a102e] m-4 p-2 lg:h-[60vh] text-white backdrop-blur-md bg-opacity-70 webkit-backdrop-blur-md rounded-md lg:w-[50%] md:w-[80%] w-[90%] ${
          questions?.length === 0 ? "" : "overflow-y-auto"
        }`}
      >
        <h2 className="text-center font-serif font-semibold text-2xl">
          Question List
        </h2>
        <div
          className={`flex justify-between items-center font-bold text-white p-2  ${
            questions?.length == 0 && "hidden"
          }`}
        ></div>
        {questions?.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p>No question added yet</p>
          </div>
        ) : (
          <DraggableItem
            questions={questions}
            moveItem={moveItem}
            handleDelete={Handledelete}
            setQuestions={setQuestions}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default DraggableList;
