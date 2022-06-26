import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { getUserByUsername } from '../firebase/services';

function useUserProfile() {
  const [userProfile, setUserProfile] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function getUserProfileByUsername() {
      const result = await getUserByUsername(user.displayName);
      setUserProfile(result);
    }

    if (user.displayName) {
      getUserProfileByUsername();
    }
  }, [user]);

  return { userProfile };
}

export default useUserProfile;
