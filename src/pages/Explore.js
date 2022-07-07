import AppHeader from '../components/common/AppHeader';
import Search from '../components/Explore/Search';
import Navbar from '../components/common/Navbar';

function Explore() {
  return (
    <div className="h-screen py-5 md:px-5 md:container md:max-w-screen-lg">
      <AppHeader />
      <div className="mt-5 md:desktop-screen">
        <Search />
        <Navbar />
      </div>
    </div>
  );
}

export default Explore;
