import { useContext } from 'react';
import AuthContext from '../../context/auth';
import Header from '../../components/layout/Header';
import MobileNav from '../../components/layout/MobileNav';
import UserContext from '../../context/user';
import useUserProfile from '../../hooks/useUserProfile';
import Timeline from './Timeline';
import SuggestedUsers from './SuggestedUsers';
import MainLayout from '../../components/layout/MainLayout';

function Home() {
  const { authUser } = useContext(AuthContext);
  const { profile } = useUserProfile(authUser.uid);

  return profile && (
    <UserContext.Provider value={{ profile }}>
      <Header />
      <MainLayout className="grid grid-cols-1 gap-10 py-8 md:grid-cols-2 xl:grid-cols-3">
        <Timeline />
        <SuggestedUsers />
      </MainLayout>
      <MobileNav />
    </UserContext.Provider>
  );
}

export default Home;
