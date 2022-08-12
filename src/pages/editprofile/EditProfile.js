/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { UserCircleIcon } from '@heroicons/react/outline';
import { updateProfile } from 'firebase/auth';
import { FirebaseContext } from '../../context/firebase';
import Input from '../../components/forms/Input';
import { getUserById } from '../../firebase/functions';
import Header from '../../components/layout/Header';
import BackButton from '../../components/buttons/BackButton';
import ImageCropper from '../../components/imageCropper/ImageCropper';

function EditProfile() {
  const { db, storage, auth } = useContext(FirebaseContext);
  const { uid } = useParams();
  const [preview, setPreview] = useState();
  const [imageSrc, setImageSrc] = useState('');
  const [image, setImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    username: '',
    name: '',
    avatar: '',
    bio: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getUserById(uid)
          .then((user) => {
            setEditedProfile({
              username: user.username,
              name: user.name,
              avatar: user.avatar,
              bio: user.bio,
            });
          });
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, []);

  const toggleModal = () => setModalIsOpen((prev) => !prev);

  // Function to handle avatar image upload
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      setImageSrc(reader.result);
      toggleModal();
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Function to handle changes to profile fields
  const handleChange = (e) => {
    setEditedProfile({
      ...editedProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageRef = ref(storage, `avatars/${uid}`);
    try {
      await updateDoc(doc(db, 'users', uid), editedProfile)
        .then(async () => {
          await uploadBytes(imageRef, image, { contentType: `${image.type}` })
            .then(async () => {
              const url = await getDownloadURL(ref(storage, `avatars/${uid}`));
              await updateDoc(doc(db, 'users', uid), { avatar: url });
              await updateProfile(auth.currentUser, {
                photoURL: url,
              });
            });
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return editedProfile && (
    <>
      <div className="hidden md:block">
        <Header />
      </div>
      <form onSubmit={handleSubmit} className="px-8 py-12 container mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BackButton />
            <h2>Edit Profile</h2>
          </div>
          <button className="text-orange-500" type="submit">
            Save
          </button>
        </div>
        <label htmlFor="image" className="flex justify-center pt-5">
          <Input
            type="file"
            accept="image/*"
            name="image"
            id="image"
            onChange={handleAvatarChange}
            className="hidden"
          />
          {editedProfile.avatar !== '' ? (
            <img
              src={editedProfile.avatar}
              alt="preview"
              className="object-cover rounded-full w-24 h-24 border border-grey-100"
            />
          ) : preview ? (
            <img
              src={preview}
              alt="preview"
              className="object-cover rounded-full w-24 h-24 border border-grey-100"
            />
          ) : (
            <UserCircleIcon className="text-grey-500 h-24 w-24" />
          )}
        </label>
        <ImageCropper
          image={imageSrc}
          setImage={setImage}
          setPreview={setPreview}
          modalIsOpen={modalIsOpen}
          toggleModal={toggleModal}
          aspect={1}
          cropShape="round"
        />
        <div className="flex flex-col gap-5 py-5">
          <label>
            Name
            <Input
              onChange={handleChange}
              className="placeholder:grey-500 bg-grey-100 w-full p-3 rounded-md"
              type="text"
              name="name"
              value={editedProfile.name}
              placeholder="Gordon Ramsay"
            />
          </label>
          <label>
            Username
            <Input
              onChange={handleChange}
              className="placeholder:grey-500 bg-grey-100 w-full p-3 rounded-md"
              type="text"
              name="name"
              value={editedProfile.username}
            />
          </label>
          <label>
            Bio
            <textarea
              onChange={handleChange}
              className="placeholder:grey-500 bg-grey-100 w-full p-3 h-32 rounded-md"
              name="bio"
              value={editedProfile.bio}
            />
          </label>
        </div>
      </form>
    </>

  );
}

export default EditProfile;
