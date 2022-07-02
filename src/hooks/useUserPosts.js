import { useEffect, useState } from 'react';
import { loadUserPosts } from '../firebase/services';

function useUserPosts(username) {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    async function getUserPosts() {
      // Get user posts from db
      const posts = await loadUserPosts(username);
      posts.sort((a, b) => b.dateCreated - a.dateCreated);
      setUserPosts(posts);
    }
    getUserPosts();
  }, [username]);
  return userPosts;
}

export default useUserPosts;
