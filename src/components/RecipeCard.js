import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard({
  id, image, title,
}) {
  return (
    <Link to={`/recipe/${id}`}>
      <img src={image} alt={title} className="rounded-md w-full object-cover" />
      <h3>{title}</h3>
    </Link>
  );
}

RecipeCard.propTypes = {
  id: Proptypes.string.isRequired,
  image: Proptypes.string.isRequired,
  title: Proptypes.string.isRequired,
};

export default RecipeCard;
