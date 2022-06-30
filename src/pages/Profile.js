import { useParams } from 'react-router-dom';
import ProfileHeader from '../components/Profile/ProfileHeader';
import Information from '../components/Profile/Information';
import Statistics from '../components/Profile/Statistics';
import Bio from '../components/Profile/Bio';
import Actions from '../components/Profile/Actions';
import Navbar from '../components/Common/Navbar';
import ProfileFeed from '../components/Profile/ProfileFeed';
import useUserProfile from '../hooks/useUserProfile';

function Profile() {
  const { username } = useParams();
  const userProfile = useUserProfile(username);

  return (
    <div className="h-screen py-3">
      <ProfileHeader />
      {userProfile && (
      <div className="h-full px-5">
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
      )}
      <Navbar />
    </div>
  );
}

export default Profile;
