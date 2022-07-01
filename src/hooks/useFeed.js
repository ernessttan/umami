import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { getFollowingPosts, getUserById } from '../firebase/services';

// Hook to get a user's feed content
function useFeed() {
  const { activeUser } = useContext(AuthContext);
  const [followingPosts, setFollowingPosts] = useState([]);

  useEffect(() => {
    async function getFeedPosts() {
      const userProfile = await getUserById(activeUser.uid);
      if (userProfile.following.length > 0) {
        await getFollowingPosts(userProfile.id, userProfile.following)
          .then((posts) => {
            posts.sort((a, b) => b.dateCreated - a.dateCreated);
            setFollowingPosts(posts);
          });
      }
    }
    getFeedPosts();
  }, [activeUser.id]);

  return followingPosts;
}

export default useFeed;
