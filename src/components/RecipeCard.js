import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ThumbUpIcon } from '@heroicons/react/outline';

function RecipeCard({
  rid, image, title, likes,
}) {
  return (
    <Link to={`/recipe/${rid}`}>
      <img src={image} alt={title} className="rounded-md w-full object-cover" />
      <h3>{title}</h3>
      <div className="flex items-center gap-2">
        <ThumbUpIcon className="w-5 h-5" />
        <p>{likes.length}</p>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  rid: Proptypes.string.isRequired,
  image: Proptypes.string.isRequired,
  title: Proptypes.string.isRequired,
  likes: Proptypes.arrayOf(Proptypes.string).isRequired,
};

export default RecipeCard;
