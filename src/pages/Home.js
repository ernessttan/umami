import { useContext } from 'react';
import AuthContext from '../context/auth';
import Header from '../components/layout/Header';
import MobileNav from '../components/layout/MobileNav';
import UserContext from '../context/user';
import useUserProfile from '../hooks/useUserProfile';
import Timeline from '../components/Timeline';

function Home() {
  const { authUser } = useContext(AuthContext);
  const { profile } = useUserProfile(authUser.uid);

  return profile && (
    <UserContext.Provider value={{ profile }}>
      <Header />
      <div className="grid grid-cols-1 h-screen">
        <Timeline />
      </div>
      <MobileNav />
    </UserContext.Provider>
  );
}

export default Home;
