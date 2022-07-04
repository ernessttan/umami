/* eslint-disable react/forbid-prop-types */
import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../../context/AuthContext';
import Actions from './Actions';
import Header from './Header';
import ProfileFeed from './ProfileFeed';
import { loadUserPosts } from '../../firebase/services';

function Profile({ profile }) {
  const { activeUser } = useContext(AuthContext);
  const [posts, setPosts] = useState();

  useEffect(() => {
    const getPosts = async () => {
      await loadUserPosts(profile.id)
        .then((userPosts) => {
          userPosts.sort((a, b) => b.dateCreated - a.dateCreated);
          setPosts(userPosts);
        });
    };
    getPosts();
  }, [profile.id]);

  return posts ? (
    <div className="grow-1 basis-3/4 px-5">
      {activeUser.uid === profile.id ? (
        <Actions />
      ) : null}
      <Header profile={profile} totalPosts={posts.length} />
      <ProfileFeed posts={posts} />
    </div>
  ) : null;
}

Profile.propTypes = {
  profile: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Profile;
