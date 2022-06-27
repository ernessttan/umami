import { useEffect, useState } from 'react';
import { getRecipeById } from '../firebase/services';
// Hook to get a recipe
function useRecipe(recipeId) {
  const [recipe, setRecipe] = useState('');

  useEffect(() => {
    async function getRecipe() {
      const recipeResult = await getRecipeById(recipeId);
      if (recipeResult) {
        setRecipe(recipeResult);
      }
    }
    getRecipe();
  }, [recipeId]);

  return recipe;
}

export default useRecipe;
