import { useParams } from 'react-router-dom';
import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import Avatar from '../components/EditProfile/Avatar';
import useUserProfile from '../hooks/useUserProfile';
import EditForm from '../components/EditProfile/EditForm';

function EditProfile() {
  const { username } = useParams();
  const profile = useUserProfile(username);
  const [userProfile, setUserProfile] = useState({
    name: '',
    username: '',
    bio: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserProfile((prevUserProfile) => ({
      ...prevUserProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await editUserProfile(profile.id, userProfile);
  };

  return (
    <form className="h-full py-8 px-5">
      <PageHeader title="Edit Profile" route={`/profile/${username}`} />
      {profile && (
        <div className="">
          <Avatar avatarUrl={profile.avatarUrl} />
          <EditForm
            username={username}
            name={profile.name}
            bio={profile.bio}
            handleChange={handleChange}
          />
          {/* <Avatar />
          <EditForm /> */}
        </div>
      )}
    </form>

  );
}

export default EditProfile;
