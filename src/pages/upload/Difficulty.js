import PropTypes from 'prop-types';

function Difficulty({ setNewRecipe }) {
  // Function to handle difficulty selection
  const handleDifficulty = (event) => {
    event.preventDefault();
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
          className="flex rounded-full border border-orange-100 text-orange-500 focus:bg-orange-500 focus:text-white font-semibold py-2 px-5"
          type="button"
          value="Easy"
          onClick={handleDifficulty}
        >
          Easy
        </button>
        <button
          className="flex rounded-full border border-orange-100 text-orange-500 focus:bg-orange-500 focus:text-white font-semibold py-2 px-5"
          type="button"
          value="Intermediate"
          onClick={handleDifficulty}
        >
          Intermediate
        </button>
        <button
          className="flex rounded-full border border-orange-100 text-orange-500 focus:bg-orange-500 focus:text-white font-semibold py-2 px-5"
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
