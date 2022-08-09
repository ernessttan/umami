import Proptypes from 'prop-types';

function RecipeCard({
  image, title,
}) {
  return (
    <div>
      <img src={image} alt={title} className="rounded-md h-2/3 w-full object-cover" />
      <h3>{title}</h3>
    </div>
  );
}

RecipeCard.propTypes = {
  image: Proptypes.string.isRequired,
  title: Proptypes.string.isRequired,
};

export default RecipeCard;
