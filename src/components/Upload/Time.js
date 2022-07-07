/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';

function Time({ handleChange, prepTime, cookTime }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-1/2">
        <h3>Prep Time</h3>
        <div className="flex items-center bg-textbox-grey rounded-lg p-2 py-3">
          <input
            type="number"
            name="prepTime"
            onChange={handleChange}
            value={prepTime}
            className="bg-transparent w-3/4"
          />
          <p>mins</p>
        </div>
      </div>
      <div className="w-1/2">
        <h3>Cook Time</h3>
        <div className="flex items-center bg-textbox-grey rounded-lg p-2 py-3">
          <input
            type="number"
            name="cookTime"
            onChange={handleChange}
            value={cookTime}
            className="bg-transparent w-3/4"
          />
          <p>mins</p>
        </div>
      </div>

    </div>
  );
}

Time.propTypes = {
  handleChange: PropTypes.func.isRequired,
  prepTime: PropTypes.string.isRequired,
  cookTime: PropTypes.string.isRequired,
};

export default Time;
