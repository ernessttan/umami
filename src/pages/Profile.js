import { useContext } from 'react';
import ProfileHeader from '../components/Profile/ProfileHeader';
import Information from '../components/Profile/Information';
import Statistics from '../components/Profile/Statistics';
import Bio from '../components/Profile/Bio';
import Actions from '../components/Profile/Actions';
import Navbar from '../components/Common/Navbar';
import ProfileFeed from '../components/Profile/ProfileFeed';
import AuthContext from '../context/AuthContext';

function Profile() {
  const { activeUser } = useContext(AuthContext);
  return (
    <div className="h-screen py-3">
      <ProfileHeader />
      <div className="h-full px-5">
        <Information
          avatarUrl={activeUser.avatarUrl}
          username={activeUser.username}
          name={activeUser.name}
        />
        <Statistics
          totalFollowers={activeUser.followers.length}
          totalFollowing={activeUser.following.length}
        />
        <Bio bio={activeUser.bio} />
        <Actions username={activeUser.username} userId={activeUser.id} />
        <ProfileFeed userId={activeUser.id} />
      </div>
      <Navbar />
    </div>
  );
}

export default Profile;
