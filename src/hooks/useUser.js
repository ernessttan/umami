import { useEffect, useState } from 'react';
import { getUserById } from '../firebase/services';

/*  Hook to retrieve a user's profile from db  */

// Expected Input: username <String>
// Expected Output: userProfile <Object>
function useUser(userId) {
  const [user, setUser] = useState();

  useEffect(() => {
    async function getUser(id) {
      // Get user object from db
      try {
        await getUserById(id).then((result) => {
          setUser(result || {});
        });
      } catch (err) {
        console.log(err);
      }
    }
    if (userId) {
      getUser(userId);
    }
  }, [userId]);

  return { profile: user };
}

export default useUser;
