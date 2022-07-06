import { useEffect, useState } from 'react';
import { getUserById } from '../firebase/services';

/*  Hook to retrieve a user's profile from db  */

// Expected Input: username <String>
// Expected Output: userProfile <Object>
function useUser(userId) {
  const [user, setUser] = useState();

  useEffect(() => {
    async function getUser(id) {
      await getUserById(id).then((result) => {
        setUser(result || {});
      })
        .catch((error) => {
          console.log(error.message);
        });
    }

    if (userId) {
      getUser(userId);
    }
  }, [userId]);

  return user;
}

export default useUser;
