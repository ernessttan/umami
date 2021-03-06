import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserProfileContext from '../../context/UserProfileContext';
import Header from './Header';
import Feed from './Feed';
import { getUserPosts } from '../../firebase/services';
import BackButton from '../common/BackButton';
import SettingsBar from './SettingsBar';
import AuthContext from '../../context/AuthContext';

function Profile() {
  const { authUser } = useContext(AuthContext);
  const { profile } = useContext(UserProfileContext);
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      await getUserPosts(id)
        .then((userPosts) => {
          userPosts.sort((a, b) => b.dateCreated - a.dateCreated);
          setPosts(userPosts);
        });
    };
    getPosts();
  }, [id]);

  return profile && posts ? (
    <div className="px-5 md:desktop-content">
      <div className="py-3">
        {authUser.uid === profile.id ? (<SettingsBar />) : (<BackButton />)}
      </div>
      <Header
        name={profile.name}
        avatarUrl={profile.avatarUrl}
        username={profile.username}
        totalPosts={posts.length}
        totalFollowers={profile.followers.length}
        totalFollowing={profile.following.length}
      />
      <Feed posts={posts} />
    </div>
  ) : null;
}

export default Profile;
