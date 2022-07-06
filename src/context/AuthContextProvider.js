/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import AuthContext from './AuthContext';
import useAuthUser from '../hooks/useAuthUser';

function AuthContextProvider({ children }) {
  const authUser = useAuthUser();

  return (
    <AuthContext.Provider value={{ authUser }}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
