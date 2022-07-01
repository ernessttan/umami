import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../components/Common/PageHeader';
import Avatar from '../components/EditProfile/Avatar';
import EditForm from '../components/EditProfile/EditForm';
import { saveEditedProfile, getUserByUsername } from '../firebase/services';
import AuthContext from '../context/AuthContext';

function EditProfile() {
  const { username } = useParams();
  const { activeUser } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    const getExistingUser = async () => {
      await getUserByUsername(username)
        .then((profile) => {
          setUserProfile({
            name: `${profile.name}`,
            username: `${profile.username}`,
            bio: `${profile.bio}`,
          });
        });
    };
    getExistingUser();
  }, [username]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Update db
    await saveEditedProfile(activeUser.uid, userProfile);
  };

  return (
    <form onSubmit={handleSubmit} className="h-full py-8 px-5">
      {userProfile && (
        <>
          <div className="flex items-center justify-between">
            <PageHeader title="Edit Profile" route={`/profile/${userProfile.username}`} />
            <button className="font-semibold text-orange-500" type="submit">Save</button>
          </div>
          <Avatar avatarUrl={userProfile.avatarUrl} />
          <EditForm
            setUserProfile={setUserProfile}
            userProfile={userProfile}
          />
        </>
      )}
    </form>
  );
}

export default EditProfile;
