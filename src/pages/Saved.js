import Header from '../components/layout/Header';
import MainLayout from '../components/layout/MainLayout';
import MobileNav from '../components/layout/MobileNav';
import SearchBar from '../components/SearchBar';

function Saved() {
  return (
    <div>
      <Header />
      <MainLayout className="p-3">
        <SearchBar />
        <h1 className="text-grey-500 text-center mt-24">
          Work In Progress
        </h1>
      </MainLayout>
      <MobileNav />
    </div>
  );
}

export default Saved;
