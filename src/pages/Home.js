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
import Navbar from '../components/common/Navbar';

function Home() {
  const { authUser } = useContext(AuthContext);
  const user = useUser(authUser.uid);
  //   const navigate = useNavigate();
  //   const { auth } = useContext(FirebaseContext);

  //   const handleLogOut = () => {
  //     signOut(auth).then(() => {
  //       navigate('/');
  //     });
  return user ? (
    // <button onClick={handleLogOut} type="button">Logout</button>
    <div className="p-5 h-screen">
      <AppHeader />
      <UserProfileContext.Provider value={user}>
        <div className="mt-5 md:desktop-screen">
          <div className="bg-blue-500 md:order-2 md:grow">TIMELINE</div>
          <Navbar />
        </div>
      </UserProfileContext.Provider>
    </div>
  ) : null;
}

export default Home;
