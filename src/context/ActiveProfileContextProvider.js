/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { useContext } from 'react';
import useUserProfile from '../hooks/useUserProfile';
import AuthContext from './AuthContext';
import ActiveProfileContext from './ActiveProfileContext';

function ActiveProfileContextProvider({ children }) {
  const { activeUser } = useContext(AuthContext);
  const userProfile = useUserProfile(activeUser.displayName);

  return (
    <ActiveProfileContext.Provider value={{ userProfile }}>
      { children }
    </ActiveProfileContext.Provider>
  );
}

export default ActiveProfileContextProvider;
