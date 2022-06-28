/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom';
import PageHeader from '../components/Common/PageHeader';
import * as ROUTES from '../constants/routes';
import Title from '../components/Recipe/Title';
import Image from '../components/Recipe/Image';
import Information from '../components/Recipe/Information';
import useRecipe from '../hooks/useRecipe';
import Servings from '../components/Recipe/Servings';
import Details from '../components/Recipe/Details';

function Recipe() {
  const { id } = useParams();
  const recipe = useRecipe(id);

  return (
    <div className="h-full py-8 px-5">
      <PageHeader title="" route={ROUTES.FEED} />
      {recipe && (
        <div className="px-2 mt-5">
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
          {/* <Social
            comments={recipe.comments}
            avatarUrl={recipe.avatarUrl}
            username={recipe.username}
            description={recipe.description}
            id={id}
          /> */}
        </div>
      )}
    </div>

  );
}

export default Recipe;
