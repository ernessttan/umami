import { useEffect, useState } from 'react';
import { getUserByUsername } from '../firebase/services';

/*  Hook to retrieve a user's profile from db  */

// Expected Input: username <String>
// Expected Output: userProfile <Object>
function useUser(username) {
  const [user, setUser] = useState();

  useEffect(() => {
    async function getUser() {
      const result = await getUserByUsername(username);
      if (result) {
        setUser(result);
      }
    }
    getUser();
  }, [username]);

  return user;
}

export default useUser;
