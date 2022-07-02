import { useParams } from 'react-router-dom';
import ProfileHeader from '../components/Profile/ProfileHeader';
import Information from '../components/Profile/Information';
import Statistics from '../components/Profile/Statistics';
import Bio from '../components/Profile/Bio';
import Actions from '../components/Profile/Actions';
import Navbar from '../components/Common/Navbar';
import ProfileFeed from '../components/Profile/ProfileFeed';
import useUser from '../hooks/useUser';

function Profile() {
  const { username } = useParams();
  const userProfile = useUser(username);

  return (
    <>
      <ProfileHeader username={username} />
      {userProfile && (
      <div className="md:app-container">
        <div className="grow-1 basis-3/4 px-10">
          <Information
            avatarUrl={userProfile.avatarUrl}
            username={userProfile.username}
            name={userProfile.name}
          />
          <Statistics
            totalFollowers={userProfile.followers.length}
            totalFollowing={userProfile.following.length}
          />
          <Bio bio={userProfile.bio} />
          <Actions username={userProfile.username} userId={userProfile.id} />
          <ProfileFeed userId={userProfile.id} />
        </div>
        <Navbar />
      </div>
      )}

    </>
  );
}

export default Profile;
