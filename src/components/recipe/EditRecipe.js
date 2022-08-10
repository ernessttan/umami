import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Title from '../upload/Title';
import Description from '../upload/Description';
import Image from '../upload/Image';
import Servings from '../upload/Servings';
import Time from '../upload/Time';
import Difficulty from '../upload/Difficulty';
import Ingredients from '../upload/ingredients/Ingredients';
import Instructions from '../upload/instructions/Instructions';
import MobileNav from '../layout/MobileNav';
import BackButton from '../buttons/BackButton';
import { getRecipeById } from '../../firebase/functions';

function EditRecipe({ rid }) {
  const [editedRecipe, setEditedRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        await getRecipeById(rid)
          .then((recipe) => {
            setEditedRecipe(recipe);
          });
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecipe();
  }, [rid]);

  const handleChange = (e) => {
    setEditedRecipe({
      ...editedRecipe,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-3">
      <div className="flex items-center justify-between">
        <BackButton />
      </div>
      <form onSubmit={handleSubmit} className="py-10 flex flex-col gap-5 container mx-auto max-w-2xl">
        <Title handleChange={handleChange} title={editedRecipe.title} />
        <Description handleChange={handleChange} caption={editedRecipe.caption} />
        <Image setImage={setImage} />
        <Servings
          servings={editedRecipe.servings}
          handleChange={handleChange}
          seteditedRecipe={seteditedRecipe}
        />
        <Time
          prepTime={editedRecipe.prepTime}
          cookTime={editedRecipe.cookTime}
          handleChange={handleChange}
        />
        <Difficulty seteditedRecipe={setEditedRecipe} />
        <Ingredients ingredients={editedRecipe.ingredients} seteditedRecipe={setEditedRecipe} />
        <Instructions instructions={editedRecipe.instructions} seteditedRecipe={setEditedRecipe} />
        <div className="flex justify-end">
          <button className="rounded-full bg-orange-500 text-white py-3 px-8" type="submit">Submit</button>
        </div>
      </form>
      <MobileNav />
    </div>
  );
}

EditRecipe.propTypes = {
  rid: PropTypes.string.isRequired,
};

export default EditRecipe;
