/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../Upload/Title';
import Image from '../Upload/Image';
import Servings from '../Upload/Servings';
import Time from '../Upload/Time';
import Difficulty from '../Upload/Difficulty';
import Ingredients from '../Upload/Ingredients/Ingredients';
import Instructions from '../Upload/Instructions/Instructions';
import { getRecipeById, editRecipe } from '../../firebase/services';

function EditRecipe({ avatarUrl, username, userId }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imageFile, setImageFile] = useState();
  const [editedRecipe, setEditedRecipe] = useState({});

  useEffect(() => {
    const getRecipe = async () => {
      await getRecipeById(id)
        .then((recipe) => {
          setEditedRecipe({
            avatarUrl: recipe.avatarUrl,
            userId: recipe.userId,
            username: recipe.username,
            id: recipe.id,
            title: recipe.title,
            imageUrl: recipe.imageUrl,
            prepTime: recipe.prepTime,
            cookTime: recipe.cookTime,
            difficulty: recipe.difficulty,
            servings: recipe.servings,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            dateCreated: recipe.dateCreated,
            likes: recipe.likes,
            comments: recipe.comments,
          });
        });
    };
    getRecipe();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await editRecipe(editedRecipe, imageFile)
      .then(() => {
        navigate('/home');
      });
  };

  return editedRecipe ? (
    <form onSubmit={handleSubmit} className="px-2 flex flex-col gap-3">
      <Title title={editedRecipe.title} handleChange={handleChange} />
      <Image setImageFile={setImageFile} imageUrl={editedRecipe.imageUrl} />
      <Servings
        setRecipe={setEditedRecipe}
        handleChange={handleChange}
        servings={editedRecipe.servings}
      />
      <Time
        handleChange={handleChange}
        prepTime={editedRecipe.prepTime}
        cookTime={editedRecipe.cookTime}
      />
      <Difficulty setRecipe={setEditedRecipe} />
      <Ingredients
        ingredients={editedRecipe.ingredients}
        setRecipe={setEditedRecipe}
      />
      <Instructions
        instructions={editedRecipe.instructions}
        setRecipe={setEditedRecipe}
      />
      <div className="flex justify-end">
        <button className="rounded-full bg-orange-500 text-white py-3 px-8" type="submit">Submit</button>
      </div>
    </form>
  ) : null;
}

EditRecipe.defaultProps = {
  avatarUrl: '/icons/profile.svg',
};

EditRecipe.propTypes = {
  avatarUrl: PropTypes.string,
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default EditRecipe;
