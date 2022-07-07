import { useState } from 'react';
import PropTypes from 'prop-types';
import IngredientList from './IngredientList';
import InstructionList from './InstructionList';

function Details({ instructions, ingredients }) {
  const [selected, setSelected] = useState('ingredients');

  const handleClick = (event) => {
    const { value } = event.target;
    setSelected(value);
  };

  return (
    <div className="mt-5">
      <div className="flex items-center gap-5 ">
        <button
          onClick={handleClick}
          type="button"
          value="ingredients"
          className={`text-lg ${selected === 'ingredients' ? 'border-b-4 border-orange-500 font-semibold' : ''}`}
        >
          Ingredients
        </button>
        <button
          onClick={handleClick}
          type="button"
          value="instructions"
          className={`text-lg ${selected === 'instructions' ? 'border-b-4 border-orange-500 font-semibold' : ''}`}
        >
          Instructions
        </button>
      </div>
      <div className="border -ml-7 w-screen md:w-full" />
      <div>
        {selected === 'ingredients' ? <IngredientList ingredients={ingredients} /> : null}
        {selected === 'instructions' ? <InstructionList instructions={instructions} /> : null}
      </div>
    </div>
  );
}

Details.propTypes = {
  instructions: PropTypes.arrayOf(PropTypes.object).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Details;
