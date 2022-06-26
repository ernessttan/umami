/* eslint-disable no-unused-vars */
import { useState } from 'react';
import PropTypes from 'prop-types';
import Title from './Title';
import Image from './Image';
import Servings from './Servings';
import Time from './Time';
import Difficulty from './Difficulty';
import Ingredients from './Ingredients/Ingredients';
import Instructions from './Instructions/Instructions';

function UploadForm({ avatarUrl }) {
  const [recipe, setRecipe] = useState({
    avatarUrl: `${avatarUrl}`,
    userId: '',
    id: '',
    title: '',
    imageUrl: '',
    prepTime: '',
    cookTime: '',
    difficulty: '',
    servings: 0,
    ingredients: [],
    dateCreated: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  return (
    <form className="flex flex-col px-2 mt-10">
      <Title handleChange={handleChange} />
      <Image />
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
};

export default UploadForm;
