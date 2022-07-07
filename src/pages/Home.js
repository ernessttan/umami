/* eslint-disable react/jsx-no-constructed-context-values */
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

  return authUser ? (
    <div className="h-screen py-5 md:px-5 md:container md:max-w-screen-lg">
      <AppHeader />
      <UserProfileContext.Provider value={{ profile }}>
        <div className="mt-5 md:desktop-screen">
          <Timeline />
          <Navbar />
        </div>
      </UserProfileContext.Provider>
    </div>
  ) : null;
}

export default Home;
