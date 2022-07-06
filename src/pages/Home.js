/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-unused-vars */
// import { useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// // import { signOut } from 'firebase/auth';
// import FirebaseContext from '../context/FireBaseContext';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import UserProfileContext from '../context/UserProfileContext';
import useUser from '../hooks/useUser';
import AppHeader from '../components/common/AppHeader';
import Timeline from '../components/Home/Timeline';
import Navbar from '../components/common/Navbar';

function Home() {
  const { authUser } = useContext(AuthContext);
  const { profile } = useUser(authUser.uid);
  //   const navigate = useNavigate();
  //   const { auth } = useContext(FirebaseContext);

  //   const handleLogOut = () => {
  //     signOut(auth).then(() => {
  //       navigate('/');
  //     });
  return (
    // <button onClick={handleLogOut} type="button">Logout</button>
    <div className="p-5 h-screen">
      <AppHeader />
      <UserProfileContext.Provider value={{ profile }}>
        <div className="mt-5 md:desktop-screen">
          <Timeline />
          <Navbar />
        </div>
      </UserProfileContext.Provider>
    </div>
  );
}

export default Home;
