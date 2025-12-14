
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableItem from "./DraggableItem";
import { useEffect } from "react";

const DraggableList = ({ questions, setQuestions, onOrderChange }) => {
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
  }, [setQuestions]);

  const Handledelete = (id) => {
    const newQuestions = questions?.filter((q) => q.id !== id);
    setQuestions(newQuestions);
    localStorage.setItem("questions", JSON.stringify(newQuestions));
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={`bg-[#1a102e] m-4 p-2  text-white backdrop-blur-md bg-opacity-70 webkit-backdrop-blur-md rounded-md lg:w-[50%] md:w-[80%] w-[90%] ${
          questions.length === 0 ? "" : ""
        }`}
      >
        <h2 className="text-center font-serif font-semibold lg:text-2xl text-xl">
          Question List
        </h2>
        <div
          className={`flex justify-between items-center font-bold text-white p-2  ${
            questions.length == 0 && "hidden"
          }`}
        ></div>
        {questions.length === 0 ? (
          <div className="flex items-center justify-center mt-5">
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


