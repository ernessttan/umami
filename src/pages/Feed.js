/* eslint-disable react/jsx-no-undef */
import AppHeader from '../components/common/AppHeader';
import Timeline from '../components/Feed/Timeline';
import Navbar from '../components/common/Navbar';

function Feed() {
  return (
    <>
      <AppHeader />
      <div className="flex flex-col h-full w-full md:flex-row">
        <Timeline />
        <Navbar />
      </div>
    </>
  );
}
export default Feed;
