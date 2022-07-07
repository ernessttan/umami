import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import RecipeCard from '../common/RecipeCard';
import { getAllRecipes } from '../../firebase/services';

function RecipeResults({ searchQuery }) {
  const [recipes, setRecipes] = useState([]);

  // Filter results by search query
  const filterResults = (query, recipeArr) => recipeArr.filter(
    (recipe) => recipe.title.toLowerCase().includes(query),
  );

  useEffect(() => {
    const getRecipes = async () => {
      await getAllRecipes()
        .then((allRecipes) => {
          const filteredRecipes = filterResults(searchQuery, allRecipes);
          setRecipes(filteredRecipes);
        });
    };
    getRecipes();
  }, []);

  const recipeList = recipes.map((recipe) => (
    <RecipeCard
      key={recipe.id}
      id={recipe.id}
      imageUrl={recipe.imageUrl}
      title={recipe.title}
      totalLikes={recipe.likes.length}
    />
  ));

  return (
    <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4 py-2">
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
