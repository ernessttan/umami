import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Input from '../components/forms/Input';
import { getUserById } from '../firebase/functions';
import Header from '../components/layout/Header';
import BackButton from '../components/buttons/BackButton';

function EditProfile() {
  const { uid } = useParams();
  const [editedProfile, setEditedProfile] = useState({
    name: '',
    username: '',
    email: '',
    bio: '',
    avatarUrl: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getUserById(uid)
          .then((user) => {
            setEditedProfile(user);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [uid]);

  console.log(editedProfile);

  const handleChange = (e) => {
    setEditedProfile({
      ...editedProfile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />
      <form className="p-5 px-8 container mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BackButton />
            <h2>Edit Profile</h2>
          </div>

          <button className="text-orange-500" type="button">
            Save
          </button>
        </div>
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
            <textarea className="placeholder:grey-500 bg-grey-100 w-full p-3 py-10 rounded-md" />
          </label>
        </div>

      </form>
    </>

  );
}

export default EditProfile;
