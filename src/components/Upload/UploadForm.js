/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Title from './Title';
import Image from './Image';
import Servings from './Servings';
import Time from './Time';
import Difficulty from './Difficulty';

function UploadForm() {
  const [recipe, setRecipe] = useState({
    avatarUrl: '',
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

  console.log(recipe);

  return (
    <form className="flex flex-col">
      <Title handleChange={handleChange} />
      <Image />
      <Servings handleChange={handleChange} />
      <Time handleChange={handleChange} />
      <Difficulty setRecipe={setRecipe} />
      {/* <Image />
      <Time />
      <Difficulty />
      <Ingredients />
      <Instructions /> */}
      <div className="flex justify-end">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default UploadForm;
