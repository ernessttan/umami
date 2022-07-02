import { useParams } from 'react-router-dom';
import ProfileHeader from '../components/Profile/ProfileHeader';
import Information from '../components/Profile/Information';
import Statistics from '../components/Profile/Statistics';
import Bio from '../components/Profile/Bio';
import Actions from '../components/Profile/Actions';
import Navbar from '../components/Common/Navbar';
import ProfileFeed from '../components/Profile/ProfileFeed';
import useUser from '../hooks/useUser';
import useUserPosts from '../hooks/useUserPosts';
import AppHeader from '../components/Common/AppHeader';

function Profile() {
  const { username } = useParams();
  const userProfile = useUser(username);
  // Get a users posts
  const posts = useUserPosts(username);

  return (
    <>
      <div className="hidden md:block">
        <AppHeader />
      </div>
      <div className="h-full md:app-container">
        {userProfile && (
        <div className="grow-1 basis-3/4 px-10 py-5">
          <ProfileHeader username={username} />
          <Information
            avatarUrl={userProfile.avatarUrl}
            username={userProfile.username}
            name={userProfile.name}
          />
          <Statistics
            totalPosts={posts.length}
            totalFollowers={userProfile.followers.length}
            totalFollowing={userProfile.following.length}
          />
          <Bio bio={userProfile.bio} />
          <Actions username={userProfile.username} userId={userProfile.id} />
          <ProfileFeed posts={posts} />
        </div>
        )}
        <Navbar />
      </div>
    </>
  );
}

export default Profile;
