import { useEffect, useState } from 'react';
import { loadUserPosts } from '../firebase/services';

function useUserPosts(userId) {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    async function getUserPosts() {
      // Get user posts from db
      const posts = await loadUserPosts(userId);
      posts.sort((a, b) => b.dateCreated - a.dateCreated);
      setUserPosts(posts);
    }
    getUserPosts();
  }, [userId]);
  return userPosts;
}

export default useUserPosts;
