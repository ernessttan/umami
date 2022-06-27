import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import generateUniqueId from 'generate-unique-id';
import Title from './Title';
import Image from './Image';
import Servings from './Servings';
import Time from './Time';
import Difficulty from './Difficulty';
import Ingredients from './Ingredients/Ingredients';
import Instructions from './Instructions/Instructions';
import { saveRecipe } from '../../firebase/services';
import * as ROUTES from '../../constants/routes';

function UploadForm({ avatarUrl, id, username }) {
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [recipe, setRecipe] = useState({
    avatarUrl: `${avatarUrl}`,
    userId: `${id}`,
    username: `${username}`,
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await saveRecipe(recipe, image)
      .then(() => {
        navigate(ROUTES.FEED);
      })
      .catch(() => {
        setRecipe({
          avatarUrl: `${avatarUrl}`,
          userId: '',
          id: `${id}`,
          title: '',
          imageUrl: '',
          prepTime: '',
          cookTime: '',
          difficulty: '',
          servings: 0,
          ingredients: [],
          dateCreated: '',
        });
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col px-2 mt-10">
      <Title handleChange={handleChange} />
      <Image setImage={setImage} />
      <Servings handleChange={handleChange} />
      <Time handleChange={handleChange} />
      <Difficulty setRecipe={setRecipe} />
      <Ingredients setRecipe={setRecipe} />
      <Instructions setRecipe={setRecipe} />
      <div className="flex justify-end">
        <button className="rounded-full bg-orange-500 text-white py-3 px-8" type="submit">Submit</button>
      </div>
    </form>
  );
}

UploadForm.defaultProps = {
  avatarUrl: '/icons/profile.svg',
};

UploadForm.propTypes = {
  avatarUrl: PropTypes.string,
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default UploadForm;
