import PropTypes from 'prop-types';

function Image({ imageUrl }) {
  return (
    <div className="-ml-7 w-screen h-72">
      <img src={imageUrl} className="object-cover w-full h-full" alt="recipe cover" />
    </div>
  );
}

Image.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default Image;
