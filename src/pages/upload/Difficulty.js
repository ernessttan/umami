import PropTypes from 'prop-types';
import { useState } from 'react';

function Difficulty({ setNewRecipe }) {
  const [selected, setSelected] = useState('');

  // Function to handle difficulty selection
  const handleDifficulty = (event) => {
    event.preventDefault();
    setSelected(event.target.value);
    const { value } = event.target;
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      difficulty: value,
    }));
  };

  return (
    <div className="mt-3 mb-3">
      <h3 className="mb-2">Difficulty</h3>
      <div className="flex gap-3">
        <button
          className={`flex rounded-full border font-semibold py-2 px-5 ${
            selected === 'Easy' ? 'bg-orange-500 text-white' : ' border-orange-100 text-orange-500 '
          }`}
          type="button"
          value="Easy"
          onClick={handleDifficulty}
        >
          Easy
        </button>
        <button
          className={`flex rounded-full border font-semibold py-2 px-5 ${
            selected === 'Intermediate' ? 'bg-orange-500 text-white' : 'border-orange-100 text-orange-500'
          }`}
          type="button"
          value="Intermediate"
          onClick={handleDifficulty}
        >
          Intermediate
        </button>
        <button
          className={`flex rounded-full border font-semibold py-2 px-5 ${
            selected === 'Hard' ? 'bg-orange-500 text-white' : 'text-orange-500 border-orange-100'
          }`}
          type="button"
          value="Hard"
          onClick={handleDifficulty}
        >
          Hard
        </button>
      </div>
    </div>
  );
}

Difficulty.propTypes = {
  setNewRecipe: PropTypes.func.isRequired,
};

export default Difficulty;
