/* eslint-disable react/no-array-index-key */
import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import AddInstruction from './AddInstruction';

function Instructions({ setNewRecipe, instructions }) {
  const [instructionList, setInstructionList] = useState([{ instruction: '' }]);

  useEffect(() => {
    setInstructionList(instructions);
  }, [instructions]);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    // Spread in existing list
    const list = [...instructionList];
    // Add new instruction obj at new index
    list[index][name] = value;
    setInstructionList(list);
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      instructions: instructionList,
    }));
  };

  const handleAddInput = () => {
    setInstructionList([...instructionList, { instruction: '' }]);
  };

  const handleRemoveInput = (index) => {
    const list = [...instructionList];
    // Remove input
    list.splice(index, 1);
    setInstructionList(list);
  };

  return (
    <div>
      <h3>Instructions</h3>
      <button type="button" onClick={handleAddInput} className="flex items-center gap-2 my-2">
        <PlusIcon className="text-orange-500 h-5 w-5" />
        <p>Add Instruction</p>
      </button>
      <div className="flex flex-col gap-2">
        {instructionList.map((input, index) => (
          <AddInstruction
            key={index}
            index={index}
            handleChange={handleChange}
            handleRemoveInput={handleRemoveInput}
            value={input.instruction}
          />
        )) }
      </div>
    </div>
  );
}

Instructions.defaultProps = {
  instructions: [],
};

Instructions.propTypes = {
  setNewRecipe: PropTypes.func.isRequired,
  instructions: PropTypes.array,
};

export default Instructions;
