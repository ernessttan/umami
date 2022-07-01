// import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import useFeedPosts from '../../hooks/useFeedPosts';
import Post from '../Post/Post';

function Timeline() {
  const followingPosts = useFeedPosts();
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
    <div className="overflow-y-scroll">
      {followingPosts.length > 0 ? ({ posts })
        : (
          <div className="flex flex-col items-center justify-center mt-[30vh]">
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
