import PropTypes from 'prop-types';

function Image({ src }) {
  return <img className="object-cover w-full h-60" src={src} alt="recipe" />;
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Image;
