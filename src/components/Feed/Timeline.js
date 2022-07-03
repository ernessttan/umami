/* eslint-disable no-nested-ternary */
import Skeleton from 'react-loading-skeleton';
import useFeed from '../../hooks/useFeed';
import Post from '../Post/Post';

function Timeline() {
  const followingPosts = useFeed();
  const posts = followingPosts.map((post) => (
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
  ));

  return (
    <div className="order-last grow basis-3/4 overflow-y-scroll py-5">
      {followingPosts === undefined ? (
        <Skeleton count={2} width={640} height={500} className="mb-5" />
      ) : followingPosts.length === 0 ? (
        <h1 className="text-grey-500 font-bold">
          Follow Someone To
          {' '}
          <br />
          View Some Recipes
        </h1>
      ) : followingPosts ? posts : null}
    </div>
  );
}

export default Timeline;
