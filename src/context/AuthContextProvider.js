/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import { onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { getUserByUsername } from '../firebase/services';

import FirebaseContext from './FireBaseContext';
import AuthContext from './AuthContext';

function AuthContextProvider({ children }) {
  const { auth } = useContext(FirebaseContext);
  const [activeUser, setActiveUser] = useState(JSON.parse(localStorage.getItem('activeUser')));
  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        localStorage.setItem('activeUser', JSON.stringify(authUser));
        await getUserByUsername(authUser.displayName).then((user) => {
          setActiveUser(user);
        });
      } else {
        localStorage.removeItem('activeUser');
        setActiveUser('');
      }
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ activeUser }}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
