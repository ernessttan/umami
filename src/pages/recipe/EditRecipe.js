import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { updateDoc, collection, doc } from 'firebase/firestore';
import Title from '../upload/Title';
import Description from '../upload/Description';
import Image from '../upload/Image';
import Servings from '../upload/Servings';
import Time from '../upload/Time';
import Difficulty from '../upload/Difficulty';
import Ingredients from '../upload/ingredients/Ingredients';
import Instructions from '../upload/instructions/Instructions';
import MobileNav from '../../components/layout/MobileNav';
import BackButton from '../../components/buttons/BackButton';
import { getRecipeById } from '../../firebase/functions';
import { FirebaseContext } from '../../context/firebase';
import AuthContext from '../../context/auth';

function EditRecipe() {
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext);
  const { storage, db } = useContext(FirebaseContext);
  const { rid } = useParams();
  const [image, setImage] = useState(null);
  const [editedRecipe, setEditedRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        await getRecipeById(authUser.uid, rid)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageRef = ref(storage, `recipes/${editedRecipe.id}`);
    try {
      await updateDoc(doc(collection(db, 'recipes'), editedRecipe.rid), editedRecipe)
        .then(async () => {
          if (image) {
            await uploadBytes(imageRef, image, { contentType: `${image.type}` })
              .then(async () => {
                const url = await getDownloadURL(ref(storage, `recipes/${editedRecipe.id}`));
                await updateDoc(doc(collection(db, 'recipes'), editedRecipe.rid), { image: url })
                  .then(() => {
                    navigate(-1);
                  });
              });
          } else {
            navigate(-1);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return editedRecipe && (
    <div className="p-3">
      <div className="flex items-center justify-between">
        <BackButton />
      </div>
      <form onSubmit={handleSubmit} className="py-10 flex flex-col gap-5 container mx-auto max-w-2xl">
        <Title handleChange={handleChange} title={editedRecipe.title} />
        <Description handleChange={handleChange} caption={editedRecipe.caption} />
        <Image setImage={setImage} image={editedRecipe.image} />
        <Servings
          servings={editedRecipe.servings}
          handleChange={handleChange}
          setNewRecipe={setEditedRecipe}
        />
        <Time
          prepTime={editedRecipe.prepTime}
          cookTime={editedRecipe.cookTime}
          handleChange={handleChange}
        />
        <Difficulty setNewRecipe={setEditedRecipe} />
        <Ingredients ingredients={editedRecipe.ingredients} setNewRecipe={setEditedRecipe} />
        <Instructions instructions={editedRecipe.instructions} setNewRecipe={setEditedRecipe} />
        <div className="flex justify-end">
          <button className="rounded-full bg-orange-500 text-white py-3 px-8" type="submit">Submit</button>
        </div>
      </form>
      <MobileNav />
    </div>
  );
}

export default EditRecipe;
