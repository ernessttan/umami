import PropTypes from 'prop-types';
import useRecipes from '../../../hooks/useRecipes';
import RecipeCard from '../../Common/RecipeCard';

function RecipeResults({ searchQuery }) {
  const recipes = useRecipes();

  const filterResults = (query, recipeArr) => recipeArr.filter(
    (recipe) => recipe.title.toLowerCase().includes(query),
  );

  const recipeList = filterResults(searchQuery, recipes).map((recipe) => (
    <RecipeCard
      key={recipe.id}
      id={recipe.id}
      imageUrl={recipe.imageUrl}
      title={recipe.title}
      totalLikes={recipe.likes.length}
    />
  ));

  return (
    <div className="grid grid-cols-2 p-5 gap-5">
      {recipeList}
    </div>
  );
}

RecipeResults.defaultProps = {
  searchQuery: '',
};

RecipeResults.propTypes = {
  searchQuery: PropTypes.string,
};

export default RecipeResults;
