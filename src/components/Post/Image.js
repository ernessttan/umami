import PropTypes from 'prop-types';

function Image({ imageUrl }) {
  return (
    <img src={imageUrl} alt="post" className="object-cover -mx-5 md:mx-0" />
  );
}

Image.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default Image;
