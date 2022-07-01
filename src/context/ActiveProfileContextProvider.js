/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { useContext } from 'react';
import useUser from '../hooks/useUser';
import AuthContext from './AuthContext';
import ActiveProfileContext from './ActiveProfileContext';

function ActiveProfileContextProvider({ children }) {
  const { activeUser } = useContext(AuthContext);
  const user = useUser(activeUser.uid);

  return (
    <ActiveProfileContext.Provider value={{ user }}>
      { children }
    </ActiveProfileContext.Provider>
  );
}

export default ActiveProfileContextProvider;
