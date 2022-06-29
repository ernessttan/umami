import PropTypes from 'prop-types';

function Time({ handleChange }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-1/2">
        <h3>Prep Time</h3>
        <input
          className="border-none bg-textbox-grey rounded-lg py-3 pl-3 w-full"
          type="number"
          name="prepTime"
          onChange={handleChange}
        />
      </div>
      <div className="w-1/2">
        <h3>Cook Time</h3>
        <input
          className="border-none bg-textbox-grey rounded-lg py-3 pl-3 w-full"
          type="number"
          name="prepTime"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

Time.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Time;
