import PropTypes from 'prop-types';

function Servings({ handleChange }) {
  return (
    <div className="flex items-center gap-3 mt-3 mb-3">
      <h3>Servings</h3>
      <input
        className="flex flex-col items-center bg-textbox-grey rounded w-10 h-8 px-3"
        type="number"
        name="servings"
        onChange={handleChange}
      />
    </div>
  );
}

Servings.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Servings;
