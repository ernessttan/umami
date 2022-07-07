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
      <BackButton />
      <Title title={recipe.title} />
      <Image imageUrl={recipe.imageUrl} />
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
  ) : null;
}

export default Recipe;
