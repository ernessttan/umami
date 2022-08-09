import { useEffect, useState } from 'react';
import { getUserById } from '../firebase/functions';

function useUserProfile(uid) {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        await getUserById(uid).then((user) => {
          setUserProfile(user);
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserProfile();
  }, [uid]);

  return { profile: userProfile };
}

export default useUserProfile;
