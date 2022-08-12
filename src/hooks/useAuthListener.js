import { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../context/firebase';

function useAuthListener() {
  const { auth } = useContext(FirebaseContext);
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));

  useEffect(() => {
    const listener = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
        localStorage.setItem('authUser', JSON.stringify(user));
      } else {
        setAuthUser(null);
        localStorage.removeItem('authUser');
      }
    });
    return () => listener();
  }, [auth]);

  return { authUser };
}

export default useAuthListener;
