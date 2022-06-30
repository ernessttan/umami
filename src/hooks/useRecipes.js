import { useEffect, useState } from 'react';
import { getAllRecipes } from '../firebase/services';

function useRecipes() {
  const [recipeResults, setRecipeResults] = useState([]);
  useEffect(() => {
    async function getRecipes() {
      const users = await getAllRecipes();
      setRecipeResults(users);
    }
    getRecipes();
  }, []);
  return recipeResults;
}

export default useRecipes;
