/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
// import { useState } from 'react';

function InstructionList({ instructions }) {
//   const [checked, setChecked] = useState([]);

  const instructionList = instructions.map((instruction, index) => (
    <li key={instruction.id} className="flex items-center gap-2 py-1">
      <input id={instruction.id} value={instruction} type="checkbox" className="w-4 h-4 border border-orange-500 focus:ring-0 text-orange-500" />
      <label htmlFor={instruction.id} className="text-lg flex items-center gap-2 ">
        <span className="font-bold">{index + 1}</span>
        {instruction.text}
      </label>
    </li>
  ));

  return (
    <ul className="py-5">
      {instructionList}
    </ul>
  );
}

InstructionList.propTypes = {
  instructions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default InstructionList;
