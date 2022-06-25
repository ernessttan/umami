/* eslint-disable react/prop-types */
import { browserLocalPersistence, onAuthStateChanged, setPersistence } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import FirebaseContext from './FireBaseContext';
import AuthContext from './AuthContext';

function AuthContextProvider({ children }) {
  const { auth } = useContext(FirebaseContext);
  const [user, setUser] = useState('');

  // Sets persistence for authenticated user
  setPersistence(auth, browserLocalPersistence);
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // Set logged in user
        console.log('Logged In!');
        setUser(authUser);
      } else {
        console.log('Logged Out!');
        setUser('');
      }
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
