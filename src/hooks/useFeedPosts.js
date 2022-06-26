import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { getFollowingPosts } from '../firebase/services';

// Hook to get a user's feed content
function useFeedPosts() {
  const { user } = useContext(AuthContext);
  const [followingPosts, setFollowingPosts] = useState([]);

  useEffect(() => {
    async function getFeedPosts() {
      if (user.following.length > 0) {
        const posts = await getFollowingPosts(user.id, user.following);
        posts.sort((a, b) => b.dateCreated - a.dateCreated);
        setFollowingPosts(posts);
      }
    }
    getFeedPosts();
  }, []);

  return followingPosts;
}

export default useFeedPosts;
