import PropTypes from 'prop-types';

function Image({ imageUrl }) {
  return (

    <img src={imageUrl} alt="post" className="object-cover h-72 w-full md:mx-0 md:rounded" />
  );
}

Image.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default Image;
