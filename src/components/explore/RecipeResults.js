/* eslint-disable no-unused-vars */
import {
  collection, getDocs, orderBy, query,
} from 'firebase/firestore';
import PropTypes from 'prop-types';
import { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../context/firebase';
import RecipeCard from '../RecipeCard';

function RecipeResults({ searchQuery }) {
  const { db } = useContext(FirebaseContext);
  const [recipes, setRecipes] = useState([]);

  // Filter results by search query
  const filterResults = (query, recipeArr) => recipeArr.filter(
    (recipe) => recipe.title.toLowerCase().includes(query),
  );

  useEffect(() => {
    const getRecipes = async () => {
      const q = query(collection(db, 'recipes'), orderBy('title'));
      try {
        await getDocs(q)
          .then((recipes) => {
            const recipeData = recipes.docs.map((recipe) => recipe.data());
            const filteredRecipes = filterResults(searchQuery, recipeData);
            setRecipes(filteredRecipes);
          });
      } catch (error) {
        console.log(error.message);
      }
    };
    getRecipes();
  }, [searchQuery]);

  return recipes && (
    <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4 py-2">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          id={recipe.id}
          image={recipe.image}
          title={recipe.title}
        />
      ))}
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
