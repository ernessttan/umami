/* eslint-disable no-nested-ternary */
import { useState, useEffect, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getFollowingPosts } from '../firebase/functions';
import Post from './post/Post';
import UserContext from '../context/user';

function Timeline() {
  const { profile } = useContext(UserContext);
  const [followingPosts, setFollowingPosts] = useState();

  useEffect(() => {
    const fetchFollowingPosts = async () => {
      if (profile.following.length > 0) {
        try {
          await getFollowingPosts(profile.uid, profile.following)
            .then((posts) => {
              setFollowingPosts(posts);
            });
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchFollowingPosts();
  }, [profile.following]);

  return (
    <div className="py-5 md:grow md:max-w-md h-screen">
      { followingPosts === undefined ? (
        <Skeleton count={2} className="w-full h-[35vh] mb-2" />
      ) : followingPosts.length === 0 ? (
        <p>No posts to show</p>
      ) : followingPosts ? (
        followingPosts.map((post) => (
          <Post
            key={post.uid}
            title={post.title}
            caption={post.caption}
            image={post.image}
            uid={post.uid}
            rid={post.rid}
            username={post.username}
            avatar={post.avatar}
            likes={post.likes}
            authUserLiked={post.authUserLiked}
            comments={post.comments}
          />
        ))
      ) : null}
    </div>

  );
}

export default Timeline;
