import PropTypes from 'prop-types';

function Title({ handleChange, title }) {
  return (
    <input
      className="border-none text-3xl"
      type="text"
      name="title"
      value={title}
      placeholder="Name your recipe..."
      onChange={handleChange}
      required
    />
  );
}

Title.defaultProps = {
  title: '',
};

Title.propTypes = {
  title: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

export default Title;
