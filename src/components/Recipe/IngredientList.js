/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';

function IngredientList({ ingredients }) {
  const ingredientList = ingredients.map((ingredient) => (
    <li key={ingredient.id} className="text-lg flex items-center gap-1 py-1">
      <span>
        {ingredient.amount}
      </span>
      <span>
        {ingredient.unit}
      </span>
      <span>
        {ingredient.title}
      </span>
    </li>
  ));

  return (
    <ul className="py-5">
      {ingredientList}
    </ul>
  );
}

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default IngredientList;
