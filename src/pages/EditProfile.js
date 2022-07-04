import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import Avatar from '../components/EditProfile/Avatar';
import EditForm from '../components/EditProfile/EditForm';
import { saveEditedProfile, getUserById } from '../firebase/services';
import AuthContext from '../context/AuthContext';

function EditProfile() {
  const { id } = useParams();
  const { activeUser } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    const getExistingUser = async () => {
      await getUserById(id)
        .then((profile) => {
          setUserProfile({
            name: `${profile.name}`,
            username: `${profile.username}`,
            bio: `${profile.bio}`,
          });
        });
    };
    getExistingUser();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Update db
    await saveEditedProfile(activeUser.uid, userProfile);
  };

  return (
    <form onSubmit={handleSubmit} className="h-full py-8 px-5">
      {userProfile && (
        <div className="container mx-auto max-w-screen-md h-screen py-10">
          <div className="flex items-center justify-between">
            <PageHeader title="Edit Profile" route={`/profile/${userProfile.username}`} />
            <button className="font-semibold text-orange-500" type="submit">Save</button>
          </div>
          <Avatar avatarUrl={userProfile.avatarUrl} />
          <EditForm
            setUserProfile={setUserProfile}
            userProfile={userProfile}
          />
        </div>
      )}
    </form>
  );
}

export default EditProfile;
