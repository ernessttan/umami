import { useContext, useState, useEffect } from 'react';
import UserContext from '../context/user';
import { getFollowingPosts } from '../firebase/functions';
import Post from './post/Post';

function Timeline() {
  const { profile } = useContext(UserContext);
  const [followingPosts, setFollowingPosts] = useState([]);

  useEffect(() => {
    const fetchFollowingPosts = async () => {
      if (profile.following.length > 0) {
        try {
          await getFollowingPosts(profile.following)
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

  return followingPosts && (
    <div className="py-5">
        {followingPosts.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            description={post.description}
            imageUrl={post.imageUrl}
            uid={post.uid}
            id={post.id}
            username={post.username}
            avatarUrl={post.avatarUrl}
          />
        ))}
    </div>
  );
}

export default Timeline;
