import PropTypes from 'prop-types';
import { MinusIcon } from '@heroicons/react/solid';

function AddIngredient({
  handleChange, index, ingredient, handleRemoveInput,
}) {
  return (
    <div className="flex items-center w-full gap-2">
      <button type="button" onClick={handleRemoveInput} value={index} className="h-5 w-5">
        <MinusIcon className="text-red-500" />
      </button>
      <input
        type="text"
        name="ingredient"
        value={ingredient}
        onChange={(event) => handleChange(event, index)}
        className="rounded bg-textbox-grey p-2 w-[90%]"
      />
    </div>

  );
}

AddIngredient.propTypes = {
  ingredient: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleRemoveInput: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default AddIngredient;
