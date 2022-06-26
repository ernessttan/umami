import PropTypes from 'prop-types';

function Time({ handleChange }) {
  return (
    <div className="flex items-center gap-5">
      <div>
        <h3>Prep Time</h3>
        <input
          className="bg-textbox-grey rounded-lg py-3 pl-3"
          type="number"
          name="prepTime"
          onChange={handleChange}
        />
      </div>
      <div>
        <h3>Cook Time</h3>
        <input
          className="bg-textbox-grey rounded-lg py-3 pl-3"
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
