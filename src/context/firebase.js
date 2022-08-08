import { createContext } from 'react';
import Proptypes from 'prop-types';
import {
  app, auth, db, storage,
} from '../firebase/firebaseConfig';

const FirebaseContext = createContext(null);
function FirebaseContextProvider({ children }) {
  return (
    <FirebaseContext.Provider value={{
      app, auth, db, storage,
    }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

FirebaseContextProvider.propTypes = {
  children: Proptypes.node.isRequired,
};

export { FirebaseContextProvider, FirebaseContext };
