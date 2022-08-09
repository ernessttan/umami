import { useState, useContext, useEffect } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import generateUniqueId from 'generate-unique-id';
import { collection, setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth';
import { FirebaseContext } from '../context/firebase';
import BackButton from '../components/buttons/BackButton';
import Image from '../components/upload/Image';
import MobileNav from '../components/layout/MobileNav';
import Title from '../components/upload/Title';
import Description from '../components/upload/Description';
import Servings from '../components/upload/Servings';
import Time from '../components/upload/Time';
import Difficulty from '../components/upload/Difficulty';
import Ingredients from '../components/upload/ingredients/Ingredients';
import Instructions from '../components/upload/instructions/Instructions';

function Upload() {
  const navigate = useNavigate();
  const { storage, db } = useContext(FirebaseContext);
  const { authUser } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [newRecipe, setNewRecipe] = useState({
    id: generateUniqueId({ length: 10 }),
    title: '',
    caption: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageRef = ref(storage, `recipes/${newRecipe.id}`);
    try {
      await uploadBytes(imageRef, image, { contentType: `${image.type}` })
        .then(async (snapshot) => {
          const url = await getDownloadURL(ref(storage, snapshot.ref.fullPath));
          setNewRecipe({
            ...newRecipe,
            image: url,
          });
        })
        .then(async () => {
          await setDoc(doc(collection(db, 'recipes'), newRecipe.id), newRecipe)
            .then(() => {
              navigate('/home');
            });
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-3">
      <div className="flex items-center justify-between">
        <BackButton />
      </div>
      <form onSubmit={handleSubmit} className="py-10 flex flex-col gap-5 container mx-auto max-w-2xl">
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
      <MobileNav />
    </div>
  );
}

export default Upload;
