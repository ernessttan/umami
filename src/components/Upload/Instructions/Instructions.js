import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AddInstructionModal from './AddInstructionModal';
import Instruction from './Instruction';

function Instructions({ setRecipe }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addedInstructions, setAddedInstructions] = useState([]);

  useEffect(() => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      instructions: addedInstructions,
    }));
  }, [addedInstructions]);

  const addInstruction = (instruction) => {
    setAddedInstructions((prevInstructions) => [...prevInstructions, instruction]);
  };

  const deleteInstruction = (event) => {
    const arr = [...addedInstructions];
    const index = arr.findIndex((instruction) => instruction.id === event.currentTarget.value);
    if (index >= 0) {
      arr.splice(index, 1);
      setAddedInstructions(arr);
    }
  };

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const instructionEntries = addedInstructions.map((instruction, index) => (
    <Instruction
      number={index + 1}
      key={instruction.id}
      text={instruction.text}
      deleteInstruction={deleteInstruction}
      id={instruction.id}
    />
  ));

  return (
    <div className="mt-4 mb-4">
      <h3>Instructions</h3>
      <button onClick={toggleModal} type="button" className="flex items-center mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          viewBox="0 0 20 20"
          fill="#EC6C3A"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        <p>Add Instruction</p>
      </button>
      <AddInstructionModal
        addInstruction={addInstruction}
        toggleModal={toggleModal}
        modalIsOpen={modalIsOpen}
      />
      <div className="p-2">{instructionEntries}</div>
    </div>
  );
}

Instructions.propTypes = {
  setRecipe: PropTypes.func.isRequired,
};

export default Instructions;
