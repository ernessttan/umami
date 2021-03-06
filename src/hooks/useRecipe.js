import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { getRecipeById } from '../firebase/services';

// Hook to get a recipe
function useRecipe(recipeId) {
  const { authUser } = useContext(AuthContext);
  const [recipe, setRecipe] = useState('');

  useEffect(() => {
    async function getRecipe() {
      const recipeResult = await getRecipeById(recipeId, authUser.uid);
      if (recipeResult) {
        setRecipe(recipeResult);
      }
    }
    getRecipe();
  }, [recipeId]);

  return recipe;
}

export default useRecipe;
