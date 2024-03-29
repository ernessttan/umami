/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';

function IngredientList({ ingredients }) {
  return (
    <ol className="p-3 list-decimal">
      {ingredients.map((ingredient, index) => (
        <li key={index} className="text-lg flex items-center gap-1 py-1">
          {ingredient.ingredient}
        </li>
      ))}
    </ol>
  );
}

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default IngredientList;
