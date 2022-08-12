import PropTypes from 'prop-types';
import { MinusIcon } from '@heroicons/react/solid';

function AddInstruction({
  handleChange, index, value, handleRemoveInput,
}) {
  return (
    <div className="flex w-full gap-2">
      <button type="button" onClick={handleRemoveInput} className="h-5 w-5">
        <MinusIcon className="text-red-500" />
      </button>
      <p className="font-bold">{index + 1}</p>
      <textarea
        name="instruction"
        value={value}
        onChange={(event) => handleChange(event, index)}
        className="rounded bg-textbox-grey p-2 w-[90%]"
      />
    </div>

  );
}

AddInstruction.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleRemoveInput: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default AddInstruction;
