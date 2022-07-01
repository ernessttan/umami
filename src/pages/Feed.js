/* eslint-disable react/jsx-no-undef */
import AppHeader from '../components/Common/AppHeader';
import Timeline from '../components/Feed/Timeline';
import Navbar from '../components/Common/Navbar';
import ActiveProfileContextProvider from '../context/ActiveProfileContextProvider';

function Feed() {
  return (
    <ActiveProfileContextProvider>
      <AppHeader />
      <Timeline />
      <Navbar />
    </ActiveProfileContextProvider>
  );
}
export default Feed;
