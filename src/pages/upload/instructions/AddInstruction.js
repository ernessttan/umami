import PropTypes from 'prop-types';
import { MinusIcon } from '@heroicons/react/solid';

function AddInstruction({
  handleChange, index, instruction, handleRemoveInput,
}) {
  return (
    <div className="flex w-full gap-2">
      <button type="button" onClick={handleRemoveInput} value={index} className="h-5 w-5">
        <MinusIcon className="text-red-500" />
      </button>
      <p className="font-bold">{index + 1}</p>
      <textarea
        name="instruction"
        value={instruction}
        onChange={(event) => handleChange(event, index)}
        className="rounded bg-textbox-grey p-2 w-[90%]"
      />
    </div>

  );
}

AddInstruction.propTypes = {
  instruction: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleRemoveInput: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default AddInstruction;
