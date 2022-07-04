/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import * as ROUTES from '../constants/routes';
import Title from '../components/Recipe/Title';
import Image from '../components/Recipe/Image';
import Information from '../components/Recipe/Information';
import useRecipe from '../hooks/useRecipe';
import Servings from '../components/Recipe/Servings';
import Details from '../components/Recipe/Details';
import Social from '../components/Recipe/Social';
import SocialBar from '../components/common/SocialBar';

function Recipe() {
  const { id } = useParams();
  const recipe = useRecipe(id);

  return recipe ? (
    <div className="px-7 py-5 md:px-0 md:container md:max-w-screen-lg">
      <PageHeader title="" route={ROUTES.FEED} />
      <div className="mt-5 h-full">
        <Title title={recipe.title} />
        <Image imageUrl={recipe.imageUrl} />
        <div>
          <Information
            username={recipe.username}
            dateCreated={recipe.dateCreated}
            difficulty={recipe.difficulty}
            prepTime={recipe.prepTime}
            cookTime={recipe.cookTime}
          />
          <Servings servings={recipe.servings} />
          <Details instructions={recipe.instructions} ingredients={recipe.ingredients} />
          <SocialBar
            totalComments={recipe.comments.length}
            totalLikes={recipe.likes.length}
            userLikedPost={recipe.userLikedPost}
            id={id}
          />
        </div>
      </div>
    </div>
    // <>
    //   <div className="pt-9 px-5">
    //     <PageHeader title="" route={ROUTES.FEED} />
    //     {recipe && (
    //     <div className="px-2 mt-5 h-full">
    //       <Title title={recipe.title} />
    //       <Image imageUrl={recipe.imageUrl} />
    //       <Information
    //         username={recipe.username}
    //         dateCreated={recipe.dateCreated}
    //         difficulty={recipe.difficulty}
    //         prepTime={recipe.prepTime}
    //         cookTime={recipe.cookTime}
    //       />
    //       <Servings servings={recipe.servings} />
    //       <Details instructions={recipe.instructions} ingredients={recipe.ingredients} />
    //       <SocialBar
    //         totalComments={recipe.comments.length}
    //         totalLikes={recipe.likes.length}
    //         userLikedPost={recipe.userLikedPost}
    //         id={id}
    //       />
    //     </div>
    //     )}
    //   </div>
    //   <Social
    //     comments={recipe.comments}
    //     avatarUrl={recipe.avatarUrl}
    //     username={recipe.username}
    //     description={recipe.description}
    //     id={id}
    //   />
    // </>

  ) : null;
}

export default Recipe;
