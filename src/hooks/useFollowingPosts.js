import { useEffect, useState } from 'react';
import { getFollowingPosts } from '../firebase/functions';

function useFollowingPosts(followingArr) {
  const [followingPosts, setFollowingPosts] = useState([]);

  useEffect(() => {
    const fetchFollowingPosts = async () => {
      if (followingArr.length > 0) {
        try {
          await getFollowingPosts(followingArr)
            .then(setFollowingPosts);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchFollowingPosts();
  }, [followingArr]);
  return followingPosts;
}

export default useFollowingPosts;
