import { useParams } from 'react-router-dom';
import useUserProfile from '../hooks/useUserProfile';
import ProfileHeader from '../components/Profile/ProfileHeader';
import Information from '../components/Profile/Information';

function Profile() {
  const { username } = useParams();
  const profile = useUserProfile(username);
  return (
    <div className="h-full">
      <div>
        <ProfileHeader />
        <Information username={profile.username} name={profile.name} />
        {/* <Statistics
          totalFollowers={profile.followers.length}
          totalFollowing={profile.following.length}
        />
        <Actions />
        <ProfileFeed /> */}
      </div>
      {/* <Navbar /> */}
    </div>
  );
}

export default Profile;
