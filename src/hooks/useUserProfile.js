import { useEffect, useState } from 'react';
import { getProfileByUsername } from '../firebase/services';

/*  Hook to retrieve a user's profile from db  */

// Expected Input: username <String>
// Expected Output: userProfile <Object>
function useUserProfile(username) {
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    async function getUserProfileByUsername() {
      const result = await getProfileByUsername(username);
      if (result) {
        setUserProfile(result);
      }
    }
    getUserProfileByUsername();
  }, [username]);

  return userProfile;
}

export default useUserProfile;
