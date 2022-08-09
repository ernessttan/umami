import PropTypes from 'prop-types';

function Title({ handleChange, newRecipe }) {
  return (
    <input
      className="border-none text-3xl"
      type="text"
      name="title"
      value={newRecipe.title}
      placeholder="Name your recipe..."
      onChange={handleChange}
    />
  );
}

Title.propTypes = {
  handleChange: PropTypes.func.isRequired,
  newRecipe: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};

export default Title;
