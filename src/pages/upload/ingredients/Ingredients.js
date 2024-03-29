/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import AddIngredient from './AddIngredient';

function Ingredients({ setNewRecipe, ingredients }) {
  const [ingredientList, setIngredientList] = useState([{ ingredient: '' }]);

  useEffect(() => {
    setIngredientList(ingredients);
  }, [ingredients]);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    // Spread in existing list
    const list = [...ingredientList];
    // Add new ingredient obj at new index
    list[index][name] = value;
    setIngredientList(list);
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: ingredientList,
    }));
  };

  const handleAddInput = () => {
    setIngredientList([...ingredientList, { ingredient: '' }]);
  };

  const handleRemoveInput = (e) => {
    e.preventDefault();
    const list = [...ingredientList];
    // Remove input
    list.splice(e.currentTarget.value, 1);
    setIngredientList(list);
  };

  return (
    <div>
      <h3>Ingredients</h3>
      <button type="button" onClick={handleAddInput} className="flex items-center gap-2 my-2">
        <PlusIcon className="text-orange-500 h-5 w-5" />
        <p>Add Ingredient</p>
      </button>
      <div className="flex flex-col gap-2">
        {ingredientList.map((input, index) => (
          <AddIngredient
            key={index}
            index={index}
            handleChange={handleChange}
            handleRemoveInput={handleRemoveInput}
            ingredient={input.ingredient}
          />
        )) }
      </div>
    </div>
  );
}

Ingredients.defaultProps = {
  ingredients: [],
};

Ingredients.propTypes = {
  setNewRecipe: PropTypes.func.isRequired,
  ingredients: PropTypes.array,
};

export default Ingredients;
