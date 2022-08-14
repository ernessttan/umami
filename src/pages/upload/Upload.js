import { useState, useContext, useEffect } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import generateUniqueId from 'generate-unique-id';
import {
  collection, setDoc, doc, updateDoc,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth';
import { FirebaseContext } from '../../context/firebase';
import BackButton from '../../components/buttons/BackButton';
import Image from './Image';
import Header from '../../components/layout/Header';
import MobileNav from '../../components/layout/MobileNav';
import Title from './Title';
import Description from './Description';
import Servings from './Servings';
import Time from './Time';
import Difficulty from './Difficulty';
import Ingredients from './ingredients/Ingredients';
import Instructions from './instructions/Instructions';
import MainLayout from '../../components/layout/MainLayout';

function Upload() {
  const navigate = useNavigate();
  const { storage, db } = useContext(FirebaseContext);
  const { authUser } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [newRecipe, setNewRecipe] = useState({
    rid: generateUniqueId({ length: 10 }),
    title: '',
    caption: '',
    ingredients: [],
    instructions: [],
    likes: [],
    image: '',
    uid: '',
    username: '',
    avatarUrl: '',
    dateCreated: Date.now(),
    servings: 0,
    prepTime: 0,
    cookTime: 0,
    difficulty: '',
  });

  useEffect(() => {
    setNewRecipe({
      ...newRecipe,
      uid: authUser.uid,
      username: authUser.displayName,
      avatar: authUser.photoURL,
    });
  }, [authUser]);

  const handleChange = (e) => {
    setNewRecipe({
      ...newRecipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageRef = ref(storage, `recipes/${newRecipe.id}`);
    const recipesRef = collection(db, 'recipes');
    console.log(newRecipe.rid);
    try {
      await setDoc(doc(recipesRef, newRecipe.rid), newRecipe)
        .then(async () => {
          await uploadBytes(imageRef, image, { contentType: `${image.type}` })
            .then(async () => {
              const url = await getDownloadURL(ref(storage, `recipes/${newRecipe.id}`));
              await updateDoc(doc(db, 'recipes', newRecipe.rid), { image: url })
                .then(() => {
                  navigate('/home');
                });
            });
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="hidden md:block">
        <Header />
      </div>
      <MainLayout className="p-3 py-5">
        <div className="flex items-center justify-between">
          <BackButton />
        </div>
        <form onSubmit={handleSubmit} className="py-10 flex flex-col gap-5">
          <Title handleChange={handleChange} title={newRecipe.title} />
          <Description handleChange={handleChange} caption={newRecipe.caption} />
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
      </MainLayout>
      <MobileNav />
    </>
  );
}

export default Upload;
