import PropTypes from 'prop-types';

function Title({ handleChange }) {
  return (
    <input
      className="text-3xl"
      type="text"
      name="title"
      placeholder="Name your recipe..."
      onChange={handleChange}
    />
  );
}

Title.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Title;
