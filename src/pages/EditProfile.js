import { useContext, useState } from 'react';
import PageHeader from '../components/Common/PageHeader';
import Avatar from '../components/EditProfile/Avatar';
import EditForm from '../components/EditProfile/EditForm';
import { editUserProfile } from '../firebase/services';
import AuthContext from '../context/AuthContext';

function EditProfile() {
  const { activeUser } = useContext(AuthContext);
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
    await editUserProfile(activeUser.id, userProfile);
  };

  return (
    <form onSubmit={handleSubmit} className="h-full py-8 px-5">
      <div className="flex items-center justify-between">
        <PageHeader title="Edit Profile" route={`/profile/${activeUser.username}`} />
        <button className="font-semibold text-orange-500" type="submit">Save</button>
      </div>
      <Avatar avatarUrl={activeUser.avatarUrl} />
      <EditForm
        username={activeUser.username}
        name={activeUser.name}
        bio={activeUser.bio}
        handleChange={handleChange}
      />
    </form>

  );
}

export default EditProfile;
