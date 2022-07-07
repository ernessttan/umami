import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById, savedEditedProfile } from '../firebase/services';
import EditForm from '../components/EditProfile/EditForm';
import Avatar from '../components/EditProfile/Avatar';
import Header from '../components/EditProfile/Header';

function EditProfile() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState();
  const [avatarImage, setAvatarImage] = useState();

  useEffect(() => {
    const getUser = async () => {
      await getUserById(id)
        .then((profile) => {
          setUserProfile({
            name: `${profile.name}`,
            username: `${profile.username}`,
            bio: `${profile.bio}`,
            avatarUrl: `${profile.avatarUrl}`,
          });
        });
    };
    getUser();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserProfile((prevUserProfile) => ({
      ...prevUserProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await savedEditedProfile(id, userProfile, avatarImage);
  };

  return userProfile ? (
    <form onSubmit={handleSubmit} className="p-5">
      <Header />
      <Avatar
        setUserProfile={setUserProfile}
        setAvatarImage={setAvatarImage}
        avatarUrl={userProfile.avatarUrl}
      />
      <EditForm
        handleChange={handleChange}
        userProfile={userProfile}
      />
    </form>
  ) : null;
}

export default EditProfile;
