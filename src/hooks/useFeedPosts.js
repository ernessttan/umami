import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { getFollowingPosts, getUserByUsername } from '../firebase/services';

// Hook to get a user's feed content
function useFeedPosts() {
  const { activeUser } = useContext(AuthContext);
  const [followingPosts, setFollowingPosts] = useState([]);

  useEffect(() => {
    async function getFeedPosts() {
      const userProfile = await getUserByUsername(activeUser.displayName);
      if (userProfile.following.length > 0) {
        const posts = await getFollowingPosts(userProfile.id, userProfile.following);
        posts.sort((a, b) => b.dateCreated - a.dateCreated);
        setFollowingPosts(posts);
      }
    }
    getFeedPosts();
  }, [activeUser.uid]);

  return followingPosts;
}

export default useFeedPosts;
