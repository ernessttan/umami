/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import FirebaseContext from './FireBaseContext';
import {
  app, auth, db, storage,
} from '../firebase/firebaseConfig';

function FirebaseContextProvider({ children }) {
  return (
    <FirebaseContext.Provider
      value={{
        app, auth, db, storage,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export default FirebaseContextProvider;
