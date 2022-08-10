/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getFollowingPosts } from '../firebase/functions';
import Post from './post/Post';

function Timeline({ following }) {
  const [followingPosts, setFollowingPosts] = useState();

  useEffect(() => {
    const fetchFollowingPosts = async () => {
      if (following.length > 0) {
        try {
          await getFollowingPosts(following)
            .then((posts) => {
              setFollowingPosts(posts);
            });
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchFollowingPosts();
  }, [following]);

  console.log(followingPosts);

  return (
    <div className="py-5 md:grow md:max-w-md h-screen">
      { followingPosts === undefined ? (
        <Skeleton count={3} className="w-full h-[35vh] mb-2" />
      ) : followingPosts.length === 0 ? (
        <p>No posts to show</p>
      ) : followingPosts ? (
        followingPosts.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            description={post.description}
            image={post.image}
            uid={post.uid}
            id={post.id}
            username={post.username}
            avatarUrl={post.avatarUrl}
          />
        ))
      ) : null}
    </div>

  );
}

Timeline.propTypes = {
  following: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Timeline;
