/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import { useContext, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Post from '../Post/Post';
import ActiveProfileContext from '../../context/ActiveProfileContext';
import { getFollowingPosts } from '../../firebase/services';
import AuthContext from '../../context/AuthContext';

function Timeline() {
  const { activeUser } = useContext(AuthContext);
  const { userProfile } = useContext(ActiveProfileContext);

  const { userProfile: { following } = {} } = useContext(ActiveProfileContext);

  const [timelinePosts, setTimelinePosts] = useState();

  useEffect(() => {
    async function getTimeline() {
      await getFollowingPosts(activeUser.id, following)
        .then((posts) => {
          posts.sort((a, b) => b.dateCreated - a.dateCreated);
          setTimelinePosts(posts);
        });
    }
    getTimeline();
  }, [following]);

  return (
    <div className="h-full order-last grow basis-3/4 overflow-y-scroll py-5">
      {following === undefined ? (
        <Skeleton count={3} className="w-full h-[35vh] mb-2" />
      ) : following.length === 0 ? (
        <h1 className="text-grey-500 font-bold">
          Follow Someone To
          <br />
          View Some Recipes
        </h1>
      ) : timelinePosts ? (
        timelinePosts.map((post) => (
          <Post
            key={post.id}
            avatarUrl={post.avatarUrl}
            id={post.id}
            likes={post.likes}
            comments={post.comments}
            title={post.title}
            dateCreated={post.dateCreated}
            userId={post.userId}
            username={post.username}
            userLikedPost={post.userLikedPost}
            imageUrl={post.imageUrl}
          />
        ))) : null }
    </div>
  );
}

export default Timeline;
