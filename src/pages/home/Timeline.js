/* eslint-disable no-nested-ternary */
import { useState, useEffect, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';
import { getFollowingPosts } from '../../firebase/functions';
import Post from '../../components/post/Post';
import UserContext from '../../context/user';

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
      } else {
        setTimeout(
          () => {
            setFollowingPosts([]);
          },
          1000,
        );
      }
    };
    fetchFollowingPosts();
  }, []);

  return (
    <div className="flex flex-col gap-20 py-5 md:grow md:max-w-md h-screen overflow-y-scroll md:no-scrollbar">
      { followingPosts === undefined ? (
        <Skeleton count={2} className="w-full h-[35vh] mb-2" />
      ) : followingPosts.length === 0 ? (
        <div className="flex flex-col items-center">
          <h1 className="text-grey-500">No Posts To Show</h1>
          <Link to="/explore" className="text-orange-500 font-semibold py-3 hover:underline decoration-2">
            Try Following Someone
          </Link>
        </div>
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
            authUserSaved={post.authUserSaved}
            comments={post.comments}
          />
        ))
      ) : null}
    </div>

  );
}

export default Timeline;
