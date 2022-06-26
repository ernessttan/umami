// Component for a single ingredient entry
import PropTypes from 'prop-types';

function Ingredient({
  title, amount, unit, id, deleteIngredient,
}) {
  return (
    <div className="flex gap-2">
      <button onClick={deleteIngredient} type="button" value={id}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="red">
          <path
            fillRule="evenodd"
            d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <p className="flex gap-1 text-lg">
        <span>{amount}</span>
        <span>
          {' '}
          {unit}
        </span>
        <span>{title}</span>
      </p>
    </div>
  );
}

Ingredient.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  deleteIngredient: PropTypes.func.isRequired,
};

export default Ingredient;
