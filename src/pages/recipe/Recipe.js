/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { getRecipeById } from '../../firebase/functions';
import IngredientList from '../../components/recipe/IngredientList';
import InstructionList from '../../components/recipe/InstructionList';
import MainLayout from '../../components/layout/MainLayout';
import Header from '../../components/layout/Header';
import BackButton from '../../components/buttons/BackButton';
import OptionsButton from '../../components/buttons/OptionsButton';
import AuthContext from '../../context/auth';

function Recipe() {
  const { authUser } = useContext(AuthContext);
  const { rid } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [selected, setSelected] = useState('ingredients');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        await getRecipeById(rid)
          .then((recipe) => {
            setRecipe(recipe);
          });
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecipe();
  }, [rid]);

  const handleSelected = (e) => {
    setSelected(e.target.value);
  };

  return recipe && (
    <>
      <div className="hidden md:block">
        <Header />
      </div>
      <MainLayout>
        <div className="flex items-center justify-between py-3">
          <BackButton />
          {authUser.uid === recipe.uid && (<OptionsButton item="recipe" itemId={recipe.id} />)}
        </div>
        <h1>{recipe.title}</h1>
        <div className="-mx-3 h-64 md:h-96">
          <img src={recipe.image} alt={recipe.title} className="h-full w-full object-cover md:rounded-md" />
        </div>
        <div className="flex flex-col gap-3 py-3 text-grey-700">
          <h3 className="text-black">
            <span className="font-normal">By </span>
            {recipe.username}
          </h3>
          <p>{`Difficulty: ${recipe.difficulty}`}</p>
          <div className="flex items-center gap-3">
            <p>{`Prep: ${recipe.prepTime}m`}</p>
            <p>{`Cook: ${recipe.cookTime}m`}</p>
          </div>
          <p>{`Servings: ${recipe.servings}`}</p>
        </div>
        <div className="mt-5 border-grey-100 -mx-3">
          <div className="flex items-center gap-5 px-3">
            <button
              onClick={handleSelected}
              type="button"
              value="ingredients"
              className={`text-lg ${selected === 'ingredients' ? 'border-b-4 border-orange-500 font-semibold' : ''}`}
            >
              Ingredients
            </button>
            <button
              onClick={handleSelected}
              type="button"
              value="instructions"
              className={`text-lg ${selected === 'instructions' ? 'border-b-4 border-orange-500 font-semibold' : ''}`}
            >
              Instructions
            </button>
          </div>
          <div className="border -mx-3 md:m-0 md:w-full" />
          {selected === 'ingredients' ? <IngredientList ingredients={recipe.ingredients} /> : null}
          {selected === 'instructions' ? <InstructionList instructions={recipe.instructions} /> : null}
        </div>
      </MainLayout>
    </>

  );
}

export default Recipe;
