import PropTypes from 'prop-types';
import { MinusIcon, PlusIcon } from '@heroicons/react/solid';

function Servings({ servings, handleChange, setRecipe }) {
  const handleIncrease = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      servings: servings + 1,
    }));
  };

  const handleDecrease = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      servings: servings - 1,
    }));
  };

  return (
    <div className="flex items-center gap-3 mt-3 mb-3">
      <h3>Servings</h3>
      <button type="button" onClick={handleDecrease} className="w-5 h-5">
        <MinusIcon />
      </button>
      <input
        className="border-none flex flex-col items-center bg-textbox-grey rounded w-10 h-8 px-3"
        type="number"
        name="servings"
        value={servings}
        onChange={handleChange}
      />
      <button type="button" onClick={handleIncrease} className="w-5 h-5">
        <PlusIcon />
      </button>
    </div>
  );
}

Servings.propTypes = {
  handleChange: PropTypes.func.isRequired,
  servings: PropTypes.number.isRequired,
  setRecipe: PropTypes.func.isRequired,
};

export default Servings;
