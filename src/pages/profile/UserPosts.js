/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getUserPosts } from '../../firebase/functions';
import RecipeCard from '../../components/RecipeCard';

function UserPosts({ uid }) {
  const [userPosts, setUserPosts] = useState();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        await getUserPosts(uid)
          .then((posts) => {
            setUserPosts(posts);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserPosts();
  }, [uid]);

  return (
    <div className="px-3 grid grid-cols-2 gap-5 md:grid-cols-3">
      {userPosts === undefined ? (
        <>
          <Skeleton count={2} className="w-full h-36" />
          <Skeleton count={2} className="w-full h-36" />
        </>
      ) : (
        userPosts.map((post) => (
          <RecipeCard
            key={post.rid}
            title={post.title}
            image={post.image}
            rid={post.rid}
            likes={post.likes}
          />
        ))
      )}
    </div>
  );
}

UserPosts.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default UserPosts;
