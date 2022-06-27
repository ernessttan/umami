import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AddIngredientModal from './AddIngredientModal';
import Ingredient from './Ingredient';

function Ingredients({ setRecipe }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addedIngredients, setAddedIngredients] = useState([]);

  useEffect(() => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: addedIngredients,
    }));
  }, [addedIngredients]);

  const addIngredient = (ingredient) => {
    setAddedIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  };

  const deleteIngredient = (event) => {
    const arr = [...addedIngredients];
    const index = arr.findIndex((ingredient) => ingredient.id === event.currentTarget.value);
    if (index >= 0) {
      arr.splice(index, 1);
      setAddedIngredients(arr);
    }
  };

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const ingredientsEntries = addedIngredients.map((ingredient) => (
    <Ingredient
      key={ingredient.id}
      title={ingredient.title}
      amount={ingredient.amount}
      unit={ingredient.unit}
      deleteIngredient={deleteIngredient}
      id={ingredient.id}
    />
  ));

  return (
    <div className="mt-4 mb-4">
      <h3>Ingredients</h3>
      <button onClick={toggleModal} type="button" className="flex items-center mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          viewBox="0 0 20 20"
          fill="#EC6C3A"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        <p>Add Ingredient</p>
      </button>
      <AddIngredientModal
        addIngredient={addIngredient}
        toggleModal={toggleModal}
        modalIsOpen={modalIsOpen}
      />
      <div className="p-2">{ingredientsEntries}</div>
    </div>
  );
}

Ingredients.propTypes = {
  setRecipe: PropTypes.func.isRequired,
};

export default Ingredients;
