/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import { useState } from 'react';
import generateUniqueId from 'generate-unique-id';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Title from './Title';
import Image from './Image';
import Servings from './Servings';
import Time from './Time';
import Difficulty from './Difficulty';
import Ingredients from './Ingredients/Ingredients';
import Instructions from './Instructions/Instructions';
import * as ROUTES from '../../constants/routes';
import { saveRecipe } from '../../firebase/services';

function Upload({ avatarUrl, username, id }) {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState();
  const [recipe, setRecipe] = useState({
    avatarUrl: `${avatarUrl}`,
    userId: `${id}`,
    id: generateUniqueId({ length: 6 }),
    title: '',
    imageUrl: '',
    prepTime: '',
    cookTime: '',
    difficulty: '',
    servings: 0,
    ingredients: [],
    dateCreated: Date.now(),
    likes: [],
    comments: [],
  });

  console.log(recipe);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await saveRecipe(recipe, imageFile)
      .then(() => {
        navigate(ROUTES.HOME);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="px-2 flex flex-col gap-3">
      <Title handleChange={handleChange} />
      <Image setImageFile={setImageFile} />
      <Servings setRecipe={setRecipe} handleChange={handleChange} servings={recipe.servings} />
      <Time handleChange={handleChange} prepTime={recipe.prepTime} cookTime={recipe.cookTime} />
      <Difficulty setRecipe={setRecipe} />
      <Ingredients setRecipe={setRecipe} />
      <Instructions setRecipe={setRecipe} />
      <div className="flex justify-end">
        <button className="rounded-full bg-orange-500 text-white py-3 px-8" type="submit">Submit</button>
      </div>
    </form>
  );
}

Upload.defaultProps = {
  avatarUrl: '/icons/profile.svg',
};

Upload.propTypes = {
  avatarUrl: PropTypes.string,
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default Upload;
