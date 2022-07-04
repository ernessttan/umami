/* eslint-disable react/jsx-no-constructed-context-values */
import { useContext } from 'react';
import Timeline from '../components/Feed/Timeline';
import Navbar from '../components/Common/Navbar';
import AppHeader from '../components/Common/AppHeader';
import AuthContext from '../context/AuthContext';
import useUser from '../hooks/useUser';
import ActiveProfileContext from '../context/ActiveProfileContext';
// import useUser from '../hooks/useUser';

// Page that display a users feed
function Feed() {
  const { activeUser } = useContext(AuthContext);
  const { userProfile } = useUser(activeUser.uid);

  return (
    <ActiveProfileContext.Provider value={{ userProfile }}>
      <AppHeader />
      <div className="md:app-container md:container md:max-w-screen-lg">
        <Timeline />
        <Navbar />
      </div>
    </ActiveProfileContext.Provider>
  );
}
export default Feed;
