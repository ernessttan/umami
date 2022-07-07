import BackButton from '../components/common/BackButton';
import Navbar from '../components/common/Navbar';
import Recipe from '../components/Recipe/Recipe';

function RecipePage() {
  return (
    <div className="px-7 py-5 h-full md:px-0 md:container md:max-w-screen-lg">
      <BackButton />
      <Recipe />
      <div className="hidden md:block">
        <Navbar />
      </div>
    </div>
  );
}

export default RecipePage;
