import PropTypes from 'prop-types';

function Image({ imageUrl }) {
  return (

    <img src={imageUrl} alt="post" className="object-cover h-72 w-full sm:rounded md:h-96 md:mx-0 " />
  );
}

Image.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default Image;
