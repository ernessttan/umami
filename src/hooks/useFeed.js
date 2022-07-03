import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { getFollowingPosts, getUserById } from '../firebase/services';

// Hook to get a user's feed content
function useFeed() {
  const { activeUser } = useContext(AuthContext);
  const [followingPosts, setFollowingPosts] = useState([]);

  useEffect(() => {
    async function getFeedPosts() {
      const { following } = await getUserById(activeUser.uid);
      if (following.length > 0) {
        await getFollowingPosts(activeUser.uid, following)
          .then((posts) => {
            posts.sort((a, b) => b.dateCreated - a.dateCreated);
            setFollowingPosts(posts);
          });
      }
    }
    getFeedPosts();
  }, [activeUser.uid]);

  return followingPosts;
}

export default useFeed;
