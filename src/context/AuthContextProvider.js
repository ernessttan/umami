/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import { onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import FirebaseContext from './FireBaseContext';
import AuthContext from './AuthContext';

function AuthContextProvider({ children }) {
  const { auth } = useContext(FirebaseContext);
  const [activeUser, setActiveUser] = useState(JSON.parse(localStorage.getItem('activeUser')));

  useEffect(() => {
    const authListener = () => {
      onAuthStateChanged(auth, async (authUser) => {
        if (authUser) {
          localStorage.setItem('activeUser', JSON.stringify(authUser));
          setActiveUser(authUser);
        } else {
          localStorage.removeItem('activeUser');
          setActiveUser(null);
        }
      });
    };

    return () => authListener();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ activeUser }}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
