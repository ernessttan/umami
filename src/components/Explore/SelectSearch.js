import PropTypes from 'prop-types';

function SelectSearch({ handleClick, selected }) {
  return (
    <>
      <div className="flex items-center gap-5 px-5 mt-2">
        <button
          onClick={handleClick}
          type="button"
          value="recipes"
          className={`text-lg ${selected === 'recipes' ? 'border-b-4 border-orange-500 font-semibold' : ''}`}
        >
          Recipes
        </button>
        <button
          onClick={handleClick}
          type="button"
          value="users"
          className={`text-lg ${selected === 'users' ? 'border-b-4 border-orange-500 font-semibold' : ''}`}
        >
          Users
        </button>
      </div>
      <div className="border -ml-7 w-screen" />
    </>
  );
}

SelectSearch.propTypes = {
  handleClick: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
};

export default SelectSearch;
