import { onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import FirebaseContext from '../context/FireBaseContext';

/*
  Hook to help with listening for authentication changes
  and retrieving the authenticated user's credentials
*/
function useAuthUser() {
  const { auth } = useContext(FirebaseContext);
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));

  useEffect(() => {
    const authListener = () => {
      // Watch for state change
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('Logged in');
          // If authenticated and logged in
          localStorage.setItem('authUser', JSON.stringify(user));
          setAuthUser(user);
        } else {
          console.log('No user signed in');
          localStorage.removeItem('authUser');
          setAuthUser(null);
        }
      });
    };
    authListener();
  }, [auth]);

  return { authUser };
}

export default useAuthUser;
