import { useParams } from 'react-router-dom';
import useUserProfile from '../hooks/useUserProfile';
import ProfileHeader from '../components/Profile/ProfileHeader';
import Information from '../components/Profile/Information';
import Statistics from '../components/Profile/Statistics';

function Profile() {
  const { username } = useParams();
  const profile = useUserProfile(username);
  return (
    <div>
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
          {/* <Actions />
          <ProfileFeed />
          <Navbar /> */}
        </div>
      )}
    </div>

  );
}

export default Profile;
