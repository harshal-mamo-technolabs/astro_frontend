import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import {
  MdDelete,
  MdEdit,
  MdDragHandle,
  MdOutlineDragIndicator,
} from "react-icons/md";
import { useDrag, useDrop } from "react-dnd";
import DraggableOption from "./Draggableoption";

const ItemType = "ROW";

const DraggableItem = ({ questions, setQuestions }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [tempQuestions, setTempQuestions] = useState([...questions]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const moveRow = (fromIndex, toIndex) => {
    const updatedQuestions = [...tempQuestions];
    const [movedRow] = updatedQuestions.splice(fromIndex, 1);
    updatedQuestions.splice(toIndex, 0, movedRow);
    setTempQuestions(updatedQuestions);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };

  const handleEdit = (question) => {
    setSelectedQuestion(question);
    onOpen();
  };
  const handleSave = () => {
    setQuestions([...tempQuestions]);
    localStorage.setItem("questions", JSON.stringify([...tempQuestions]));
    onClose();
  };
  useEffect(() => {
    setTempQuestions([...questions]);
  }, [questions]);

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Question</Th>
            <Th>Type</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tempQuestions.map((item, index) => (
            <DraggableRow
              key={item.id}
              index={index}
              item={item}
              moveRow={moveRow}
              onEdit={handleEdit}
              questions={questions}
              setQuestions={setQuestions}
            />
          ))}
        </Tbody>
      </Table>

      <EditQuestionModal
        isOpen={isOpen}
        onClose={onClose}
        question={selectedQuestion}
        onSave={handleSave}
        setTempQuestions={setTempQuestions}
        setQuestions={setQuestions}
      />
    </>
  );
};
const DraggableRow = ({ index, item, moveRow, onEdit, setQuestions }) => {
  const [isDragging, setIsDragging] = useState(false);

  const [, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveRow(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const handleDelete = () => {
    const storedQuestions = JSON.parse(localStorage.getItem("questions"));
    const updatedQuestions = storedQuestions.filter((q) => q.id !== item.id);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
    setQuestions(updatedQuestions);
  };

  return (
    <Tr ref={(node) => drag(drop(node))}>
      <Td className="w-[50%]">
        <div className=" flex gap-5">
          <MdOutlineDragIndicator className="text-2xl cursor-grab" />
          {item.label}
        </div>
      </Td>
      <Td>
        {item.options?.map((option, index) => (
          <React.Fragment key={index}>
            {option}
            <br />
          </React.Fragment>
        ))}
      </Td>
      <Td>
        {isDragging && <MdDragHandle style={{ cursor: "grab" }} />}
        <IconButton
          aria-label="Edit"
          icon={<MdEdit />}
          size="sm"
          mr={2}
          onClick={() => onEdit(item)}
        />
        <IconButton
          aria-label="Delete"
          icon={<MdDelete />}
          size="sm"
          onClick={handleDelete}
        />
      </Td>
    </Tr>
  );
};

const EditQuestionModal = ({
  isOpen,
  onClose,
  question,
  setTempQuestions,
  setQuestions,
}) => {
  const [editedQuestion, setEditedQuestion] = useState(null);
  const [newOption, setNewOption] = useState("");
  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      setEditedQuestion((prevQuestion) => {
        const updatedOptions = [...prevQuestion?.options, newOption];
        return { ...prevQuestion, options: updatedOptions };
      });
      setNewOption("");
    }
  };
  useEffect(() => {
    if (question) {
      setEditedQuestion({
        label: question.label || "",
        options: question.options || [],
      });
    }
  }, [question]);

  const handleSave = () => {
    const storedQuestions = JSON.parse(localStorage.getItem("questions"));
    const updatedQuestions = storedQuestions?.map((q) =>
      q.id === question.id ? { ...q, ...editedQuestion } : q
    );
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
    setTempQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === question.id ? { ...q, ...editedQuestion } : q
      )
    );
    onClose();
  };
  const handleOptionMove = (
    fromQuestionId,
    fromIndex,
    toQuestionId,
    toIndex
  ) => {
    setEditedQuestion((prevQuestion) => {
      const updatedOptions = [...prevQuestion?.options];
      const [movedOption] = updatedOptions.splice(fromIndex, 1);
      updatedOptions.splice(toIndex, 0, movedOption);
      return { ...prevQuestion, options: updatedOptions };
    });
  };

  const handleOptionChange = (questionId, index, value) => {
    setEditedQuestion((prevQuestion) => {
      const updatedOptions = [...prevQuestion?.options];
      updatedOptions[index] = value;
      return { ...prevQuestion, options: updatedOptions };
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg={"#1a102e"} textColor={"white"}>
          Edit Question
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody bg={"#1a102e"} textColor={"white"}>
          <Input
            placeholder="Enter question"
            value={editedQuestion?.label}
            onChange={(e) =>
              setEditedQuestion({ ...editedQuestion, label: e.target.value })
            }
          />
          <Box className="mt-5 flex justify-center flex-col items-center">
            {question?.type === "radio" && (
              <h2 className="text-center font-nunito-light font-semibold">
                options
              </h2>
            )}

            {/* {editedQuestion?.options?.map((option, index) => ( */}
            <DraggableOption
              editedQuestion={editedQuestion}
              moveOption={handleOptionMove}
              handleOptionChange={handleOptionChange}
              questionId={question?.id}
              setQuestions={setQuestions}
              question={question}
              setEditedQuestion={setEditedQuestion}
            />
            {/* ))} */}
          </Box>
          {question?.type === "radio" && (
            <>
              <Input
                placeholder="Enter new option"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
              />
              <button
                className="bg-gradient-to-r m-2 from-purple-600 to-indigo-700 text-white p-2 rounded mr-2"
                onClick={handleAddOption}
              >
                Add Option
              </button>
            </>
          )}
        </ModalBody>
        <ModalFooter bg={"#1a102e"} textColor={"white"}>
          <button
            className="bg-gradient-to-r m-2 from-purple-600 to-indigo-700 text-white p-2 rounded mr-2"
            onClick={handleSave}
          >
            Save
          </button>

          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DraggableItem;
