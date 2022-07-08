import PropTypes from 'prop-types';

function Image({ imageUrl }) {
  return (
    <div className="w-screen h-72 md:ml-0 md:w-full md:h-[40vh]">
      <img src={imageUrl} className="md:rounded object-cover w-full h-full" alt="recipe cover" />
    </div>
  );
}

Image.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default Image;
