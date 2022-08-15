import PropTypes from 'prop-types';
import { MinusIcon, PlusIcon } from '@heroicons/react/solid';

function Servings({ servings, handleChange, setNewRecipe }) {
  const handleIncrease = () => {
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      servings: servings + 1,
    }));
  };

  const handleDecrease = () => {
    setNewRecipe((prevRecipe) => ({
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
        className="border-none flex items-center justify-center bg-textbox-grey rounded w-8 h-8"
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

Servings.defaultProps = {
  servings: 0,
};

Servings.propTypes = {
  handleChange: PropTypes.func.isRequired,
  servings: PropTypes.number,
  setNewRecipe: PropTypes.func.isRequired,
};

export default Servings;
