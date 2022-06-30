// import Skeleton from 'react-loading-skeleton';
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
    <div>
      {posts}
    </div>
  );
}

export default Timeline;
