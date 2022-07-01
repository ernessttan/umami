import AppHeader from '../components/Common/AppHeader';
import Timeline from '../components/Feed/Timeline';
import Navbar from '../components/Common/Navbar';

// Page that display a users feed
function Feed() {
  return (
    <>
      <AppHeader />
      <Timeline />
      <Navbar />
    </>
  );
}
export default Feed;
