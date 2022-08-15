/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';

function InstructionList({ instructions }) {
  return (
    <ul className="p-3">
      {instructions.map((instruction, index) => (
        <li key={index} className="flex items-start gap-2 py-1">
          <input id={instruction.id} value={instruction} type="checkbox" className="form-checkbox w-4 h-4 border border-orange-500 focus:ring-0 text-orange-500" />
          <span className="font-bold">{index + 1}</span>
          <label htmlFor={instruction.id} className="text-lg">
            {instruction.instruction}
          </label>
        </li>
      ))}
    </ul>
  );
}

InstructionList.propTypes = {
  instructions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default InstructionList;
