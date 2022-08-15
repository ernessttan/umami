/* eslint-disable no-unused-vars */
import {
  collection, getDocs, orderBy, query,
} from 'firebase/firestore';
import PropTypes from 'prop-types';
import { useEffect, useState, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FirebaseContext } from '../../context/firebase';
import RecipeCard from '../../components/cards/RecipeCard';

function RecipeResults({ searchQuery }) {
  const { db, auth } = useContext(FirebaseContext);
  const [recipes, setRecipes] = useState();

  // Filter results by search query
  const filterResults = (query, recipeArr) => recipeArr.filter(
    (recipe) => recipe.title.toLowerCase().includes(query) && recipe.uid !== auth.currentUser.uid,
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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-5">
      { recipes === undefined ? (
        <>
          <Skeleton count={10} height={130} width="100%" />
          <Skeleton count={10} height={130} width="100%" />
          <Skeleton count={10} height={130} width="100%" />
        </>
      ) : (
        <>
          {
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.rid}
              rid={recipe.rid}
              title={recipe.title}
              image={recipe.image}
              likes={recipe.likes}
            />
          ))
        }
        </>
      )}
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
