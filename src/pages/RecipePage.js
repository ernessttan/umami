import AppHeader from '../components/common/AppHeader';
import Navbar from '../components/common/Navbar';
import Recipe from '../components/Recipe/Recipe';

function RecipePage() {
  return (
    <div className="py-5 h-full md:container md:max-w-screen-lg">
      <div className="hidden md:block">
        <AppHeader />
      </div>
      <div className="mt-5 md:desktop-screen">
        <Recipe />
        <div className="hidden md:block md:order-first md:basis-1/3">
          <Navbar />
        </div>
      </div>

    </div>
  );
}

export default RecipePage;
