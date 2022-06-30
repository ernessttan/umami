// import Skeleton from 'react-loading-skeleton';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import useFeedPosts from '../../hooks/useFeedPosts';
import Post from '../Post/Post';

function Timeline() {
  const { activeUser } = useContext(AuthContext);
  console.log(activeUser);
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
      {followingPosts.length > 0 ? ({ posts }) : (<div>Follow Someone</div>)}
    </div>
  );
}

export default Timeline;
