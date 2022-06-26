/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Title from './Title';
import Image from './Image';

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

  return (
    <form className="flex flex-col">
      <Title handleChange={handleChange} />
      <Image />
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
