// import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
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
    <div className="mt-20 order-last grow">
      {followingPosts.length > 0 ? ({ posts })
        : (
          <div className="text-center">
            <h1 className="text-grey-500 font-bold">
              Follow Someone To
              {' '}
              <br />
              View Some Recipes
            </h1>
            <Link className="mt-5 text-orange-500 text-xl font-semibold" to="/explore">Explore</Link>
          </div>
        )}
    </div>
  );
}

export default Timeline;
