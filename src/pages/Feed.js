import AppHeader from '../components/Common/AppHeader';
import Timeline from '../components/Feed/Timeline';
import Navbar from '../components/Common/Navbar';

// Page that display a users feed
function Feed() {
  return (
    <div className="h-full">
      <AppHeader />
      <div className="h-full flex flex-col md:flex-row">
        <Timeline />
        <Navbar />
      </div>

    </div>
  );
}
export default Feed;
