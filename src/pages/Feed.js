/* eslint-disable react/jsx-no-undef */
import AppHeader from '../components/common/AppHeader';
import Timeline from '../components/Feed/Timeline';

function Feed() {
  return (
    <div>
      <AppHeader />
      <div className="flex flex-col w-full md:flex-row">
        <Timeline />
        {/* <Timeline />
        <Navbar /> */}
      </div>
    </div>
  );
}
export default Feed;
