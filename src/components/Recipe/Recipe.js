import { useParams } from 'react-router-dom';
import useRecipe from '../../hooks/useRecipe';
import Title from './Title';
import Image from './Image';
import Information from './Information';
import Servings from './Servings';
import Details from './Details';
import SocialBar from '../common/SocialBar';
import BackButton from '../common/BackButton';

function Recipe() {
  const { id } = useParams();
  const recipe = useRecipe(id);

  return recipe ? (
    <div className="md:grow">
      <div className="px-3">
        <BackButton />
      </div>
      <div className="px-5 flex items-center justify-between w-full">
        <Title title={recipe.title} username={recipe.username} recipeId={id} />
      </div>
      <Image imageUrl={recipe.imageUrl} />
      <div className="px-5">
        <Information
          username={recipe.username}
          dateCreated={recipe.dateCreated}
          difficulty={recipe.difficulty}
          prepTime={recipe.prepTime}
          cookTime={recipe.cookTime}
        />
        <Servings servings={recipe.servings} />
        <Details instructions={recipe.instructions} ingredients={recipe.ingredients} />
        <div className="my-5">
          <SocialBar
            totalComments={recipe.comments.length}
            totalLikes={recipe.likes.length}
            userLikedPost={recipe.userLikedPost}
            id={recipe.id}
          />
        </div>
      </div>

    </div>
  ) : null;
}

export default Recipe;
