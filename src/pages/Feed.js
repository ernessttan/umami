import Timeline from '../components/Feed/Timeline';
import Navbar from '../components/Common/Navbar';
import AppHeader from '../components/Common/AppHeader';

// Page that display a users feed
function Feed() {
  return (
    <>
      <AppHeader />
      <div className="md:app-container">
        <Timeline />
        <Navbar />
      </div>

    </>
  );
}
export default Feed;
