import { useContext } from 'react';
import AuthContext from '../context/auth';
import Header from '../components/layout/Header';
import MobileNav from '../components/layout/MobileNav';
import UserContext from '../context/user';
import useUserProfile from '../hooks/useUserProfile';
import Timeline from '../components/Timeline';
import SuggestedUsers from '../components/layout/SuggestedUsers';

function Home() {
  const { authUser } = useContext(AuthContext);
  const { profile } = useUserProfile(authUser.uid);

  return profile && (
    <UserContext.Provider value={{ profile }}>
      <Header />
      <div className="gap-12 py-5 md:flex md:px-3 md:container md:max-w-4xl">
        <Timeline />
        <SuggestedUsers />
      </div>
      <MobileNav />
    </UserContext.Provider>
  );
}

export default Home;
