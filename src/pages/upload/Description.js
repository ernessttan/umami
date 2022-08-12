import PropTypes from 'prop-types';

function Description({ handleChange, caption }) {
  return (
    <textarea
      className="border-none text-xl"
      type="text"
      name="caption"
      value={caption}
      placeholder="Write a caption for your post here..."
      onChange={handleChange}
      required
    />
  );
}

Description.propTypes = {
  handleChange: PropTypes.func.isRequired,
  caption: PropTypes.string.isRequired,
};

export default Description;
