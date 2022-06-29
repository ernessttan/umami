/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import { onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getUserByUsername } from '../firebase/services';

import FirebaseContext from './FireBaseContext';
import AuthContext from './AuthContext';

function AuthContextProvider({ children }) {
  const { auth } = useContext(FirebaseContext);
  const [activeUser, setActiveUser] = useState(JSON.parse(localStorage.getItem('activeUser')));
  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const user = await getUserByUsername(authUser.displayName);
        localStorage.setItem('activeUser', JSON.stringify(user));
        setActiveUser(user);
      } else {
        localStorage.removeItem('activeUser');
        setUser('');
      }
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ activeUser }}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
