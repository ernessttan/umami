import { useState, useContext, useEffect } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import generateUniqueId from 'generate-unique-id';
import { collection, setDoc } from 'firebase/firestore';
import AuthContext from '../context/auth';
import { FirebaseContext } from '../context/firebase';
import Header from '../components/layout/Header';
import Image from '../components/upload/Image';
import MobileNav from '../components/layout/MobileNav';
import Title from '../components/upload/Title';
import Servings from '../components/upload/Servings';
import Time from '../components/upload/Time';
import Difficulty from '../components/upload/Difficulty';
import Ingredients from '../components/upload/ingredients/Ingredients';
import Instructions from '../components/upload/instructions/Instructions';

function Upload() {
  const { storage, db } = useContext(FirebaseContext);
  const { authUser } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [newRecipe, setNewRecipe] = useState({
    id: generateUniqueId({ length: 10 }),
    title: '',
    description: '',
    ingredients: [],
    instructions: [],
    image: '',
    uid: '',
    username: '',
    avatarUrl: '',
    dateCreated: Date.now(),
    servings: 0,
    prepTime: 0,
    cookTime: 0,
  });

  useEffect(() => {
    setNewRecipe({
      ...newRecipe,
      uid: authUser.uid,
      username: authUser.displayName,
      avatarUrl: authUser.photoURL,
    });
  }, [authUser]);

  const handleChange = (e) => {
    setNewRecipe({
      ...newRecipe,
      [e.target.name]: e.target.value,
    });
  };

  console.log(image);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageRef = ref(storage, `recipes/${newRecipe.id}`);
    try {
      await uploadBytes(imageRef, image, { contentType: `${image.type}` })
        .then(async (snapshot) => {
          const url = await getDownloadURL(ref(storage, snapshot.ref.fullPath));
          console.log(url);
          setNewRecipe({
            ...newRecipe,
            image: url,
          });
        })
        .then(async () => {
          console.log(newRecipe);
          await setDoc(collection(db, 'recipes'), newRecipe.id, newRecipe);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} className="p-3 flex flex-col gap-5">
        <Title handleChange={handleChange} newRecipe={newRecipe} />
        <Image setImage={setImage} />
        <Servings
          servings={newRecipe.servings}
          handleChange={handleChange}
          setNewRecipe={setNewRecipe}
        />
        <Time
          prepTime={newRecipe.prepTime}
          cookTime={newRecipe.cookTime}
          handleChange={handleChange}
        />
        <Difficulty setNewRecipe={setNewRecipe} />
        <Ingredients ingredients={newRecipe.ingredients} setNewRecipe={setNewRecipe} />
        <Instructions instructions={newRecipe.instructions} setNewRecipe={setNewRecipe} />
        <div className="flex justify-end">
          <button className="rounded-full bg-orange-500 text-white py-3 px-8" type="submit">Submit</button>
        </div>
      </form>
      <MobileNav />
    </>
  );
}

export default Upload;
