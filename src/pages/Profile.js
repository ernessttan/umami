import { useParams } from 'react-router-dom';
import useUserProfile from '../hooks/useUserProfile';
import ProfileHeader from '../components/Profile/ProfileHeader';
import Information from '../components/Profile/Information';
import Statistics from '../components/Profile/Statistics';
import Bio from '../components/Profile/Bio';
import Actions from '../components/Profile/Actions';
import Navbar from '../components/common/Navbar';
import ProfileFeed from '../components/Profile/ProfileFeed';

function Profile() {
  const { username } = useParams();
  const profile = useUserProfile(username);
  return (
    <div className="h-full">
      {profile && (
        <div className="h-full py-8 px-5">
          <ProfileHeader />
          <Information
            avatarUrl={profile.avatarUrl}
            username={profile.username}
            name={profile.name}
          />
          <Statistics
            totalFollowers={profile.followers.length}
            totalFollowing={profile.following.length}
          />
          <Bio bio={profile.bio} />
          <Actions username={profile.username} userId={profile.id} />
          <ProfileFeed userId={profile.id} />
        </div>
      )}
      <Navbar />
    </div>

  );
}

export default Profile;
