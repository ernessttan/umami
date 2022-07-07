/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';

function InstructionList({ instructions }) {
  const instructionList = instructions.map((instruction, index) => (
    <li key={index} className="flex items-center gap-2 py-1">
      <input id={instruction.id} value={instruction} type="checkbox" className="w-4 h-4 border border-orange-500 focus:ring-0 text-orange-500" />
      <label htmlFor={instruction.id} className="text-lg flex items-center gap-2 ">
        <span className="font-bold">{index + 1}</span>
        {instruction.instruction}
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
