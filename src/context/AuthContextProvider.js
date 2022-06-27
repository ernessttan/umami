/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import { browserLocalPersistence, onAuthStateChanged, setPersistence } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import FirebaseContext from './FireBaseContext';
import AuthContext from './AuthContext';

function AuthContextProvider({ children }) {
  const { auth } = useContext(FirebaseContext);
  // Sets persistence for authenticated user
  setPersistence(auth, browserLocalPersistence);
  const [activeUser, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // Set logged in user
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem('authUser');
        setUser('');
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ activeUser }}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
