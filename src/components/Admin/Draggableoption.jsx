// import { useState } from "react";
// import { useDrag, useDrop } from "react-dnd";
// import { Input, Flex, IconButton } from "@chakra-ui/react";
// import { MdDelete, MdEdit, MdSave, MdDragHandle } from "react-icons/md";

import { IconButton } from "@chakra-ui/react";

// const DraggableOption = ({
//   option,
//   index,
//   moveOption,
//   handleOptionChange,
//   questionId,
//   setQuestions,
//   question,
//   setEditedQuestion,
//   editedQuestion,
// }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedOption, setEditedOption] = useState(option);
//   console.log(editedQuestion.options, "optionasasas");
//   const [, drag] = useDrag({
//     type: "OPTION",
//     item: { index, questionId },
//   });

//   const [, drop] = useDrop({
//     accept: "OPTION",
//     hover: (draggedItem) => {
//       if (
//         draggedItem.index !== index ||
//         draggedItem.questionId !== questionId
//       ) {
//         moveOption(
//           draggedItem.questionId,
//           draggedItem.index,
//           questionId,
//           index
//         );
//       }
//     },
//   });

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveEdit = () => {
//     setIsEditing(false);
//     handleOptionChange(questionId, index, editedOption);
//   };
//   const handleDeleteClick = () => {
//     const updatedOptions = question.options ? [...question.options] : [];
//     updatedOptions.splice(index, 1);

//     setQuestions((prevQuestions) =>
//       prevQuestions?.map((q) =>
//         q.id === questionId ? { ...q, options: updatedOptions } : q
//       )
//     );

//     const storedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
//     const updatedQuestions = storedQuestions.map((q) =>
//       q.id === questionId ? { ...q, options: updatedOptions } : q
//     );

//     localStorage.setItem("questions", JSON.stringify(updatedQuestions));
//     setEditedQuestion(updatedQuestions);
//   };

//   return (
//     <div ref={(node) => drag(drop(node))}>
//       <Flex align="center" gap={10} m={1}>
//         <MdDragHandle style={{ cursor: "grab" }} />
//         {isEditing ? (
//           <>
//             <Input
//               value={editedOption}
//               onChange={(e) => setEditedOption(e.target.value)}
//               placeholder={`Option ${index + 1}`}
//             />
//             <IconButton
//               aria-label="Save"
//               icon={<MdSave />}
//               size="sm"
//               ml={2}
//               onClick={handleSaveEdit}
//             />
//           </>
//         ) : (
//           <>
//             <div className=" w-[10vw]">
//               {editedQuestion?.options?.map((d, index) => (
//                 <h2 key={index}>{d}</h2>
//               ))}
//             </div>
//             <IconButton
//               aria-label="Edit"
//               icon={<MdEdit />}
//               size="sm"
//               ml={2}
//               onClick={handleEditClick}
//             />
//           </>
//         )}
//         <IconButton
//           aria-label="Remove option"
//           icon={<MdDelete />}
//           className="text-6xl cursor-pointer text-red-600"
//           ml={2}
//           size="sm"
//           onClick={handleDeleteClick}
//         />
//       </Flex>
//     </div>
//   );
// };

// export default DraggableOption;
// const handleDeleteClick = (index) => {
//     const updatedOptions = [...editedQuestion.options];
//     updatedOptions.splice(index, 1);

//     setEditedQuestion({
//       ...editedQuestion,
//       options: updatedOptions,
//     });
//   };

import { useState } from "react";
import { MdDelete, MdEdit, MdCheck } from "react-icons/md";

const DraggableOption = ({ editedQuestion, setEditedQuestion }) => {
  const [editingStatus, setEditingStatus] = useState(
    editedQuestion.options.map(() => false)
  );
  const [editedOptions, setEditedOptions] = useState(
    editedQuestion.options.map((option) => option)
  );

  const handleDeleteClick = (index) => {
    const updatedOptions = [...editedQuestion.options];
    updatedOptions.splice(index, 1);

    setEditedQuestion({
      ...editedQuestion,
      options: updatedOptions,
    });
  };

  const handleEditClick = (index) => {
    setEditingStatus((prev) =>
      prev.map((status, i) => (i === index ? !status : status))
    );
  };

  const handleSaveClick = (index) => {
    const updatedOptions = [...editedOptions];
    const updatedEditingStatus = [...editingStatus];

    updatedOptions[index] = editedOptions[index];
    updatedEditingStatus[index] = false;

    setEditedOptions(updatedOptions);
    setEditingStatus(updatedEditingStatus);

    setEditedQuestion({
      ...editedQuestion,
      options: updatedOptions,
    });
  };

  return (
    <div className=" w-full">
      {editedQuestion?.options?.map((data, index) => {
        return (
          <div key={index} className="flex justify-evenly gap-2 items-center">
            {editingStatus[index] ? (
              <>
                <input
                  type="text"
                  value={editedOptions[index]}
                  className="text-black"
                  onChange={(e) => {
                    const value = e.target.value;
                    setEditedOptions((prev) =>
                      prev?.map((option, i) => (i === index ? value : option))
                    );
                  }}
                />
                <IconButton
                  aria-label="Save option"
                  icon={<MdCheck />}
                  className="text-6xl cursor-pointer text-green-600 m-1"
                  onClick={() => handleSaveClick(index)}
                  size="sm"
                />
              </>
            ) : (
              <>
                <div className=" w-[40%]">
                  <h2>- {data}</h2>
                </div>
                <div>
                  <IconButton
                    aria-label="Edit option"
                    icon={<MdEdit />}
                    className="text-6xl cursor-pointer text-blue-600 m-1"
                    onClick={() => handleEditClick(index)}
                    size="sm"
                  />
                  <IconButton
                    aria-label="Remove option"
                    icon={<MdDelete />}
                    className="text-6xl cursor-pointer text-red-600 m-1"
                    onClick={() => handleDeleteClick(index)}
                    size="sm"
                  />
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DraggableOption;
