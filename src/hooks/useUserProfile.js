import { useEffect, useState } from 'react';
import { getUserByUsername } from '../firebase/services';

function useUserProfile(username) {
  const [userProfile, setUserProfile] = useState('');

  useEffect(() => {
    async function getUserProfileByUsername() {
      const result = await getUserByUsername(username);
      setUserProfile(result);
    }
    getUserProfileByUsername();
  }, [username]);

  return userProfile;
}

export default useUserProfile;
