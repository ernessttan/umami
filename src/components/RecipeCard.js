import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard({
  rid, image, title,
}) {
  return (
    <Link to={`/recipe/${rid}`}>
      <img src={image} alt={title} className="rounded-md w-full object-cover" />
      <h3>{title}</h3>
    </Link>
  );
}

RecipeCard.propTypes = {
  rid: Proptypes.string.isRequired,
  image: Proptypes.string.isRequired,
  title: Proptypes.string.isRequired,
};

export default RecipeCard;
