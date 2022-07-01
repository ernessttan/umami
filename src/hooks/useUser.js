import { useEffect, useState } from 'react';
import { getUserById } from '../firebase/services';

/*  Hook to retrieve a user's profile from db  */

// Expected Input: userId <String>
// Expected Output: userProfile <Object>
function useUser(userId) {
  const [user, setUser] = useState();

  useEffect(() => {
    async function getUser() {
      const result = await getUserById(userId);
      if (result) {
        setUser(result);
      }
    }
    getUser();
  }, [userId]);

  return user;
}

export default useUser;
