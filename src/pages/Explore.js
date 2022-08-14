import { useState } from 'react';
import RecipeResults from '../components/explore/RecipeResults';
import UserResults from '../components/explore/UserResults';
import Header from '../components/layout/Header';
import SearchBar from '../components/SearchBar';
import MobileNav from '../components/layout/MobileNav';
import MainLayout from '../components/layout/MainLayout';

function Explore() {
  const [selected, setSelected] = useState('recipes');
  const [searchQuery, setSearchQuery] = useState('');

  const handleClick = (event) => {
    const { value } = event.target;
    setSelected(value);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value.toLowerCase());
  };

  return (
    <div>
      <Header />
      <MainLayout className="p-5">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleChange={handleChange}
        />
        <div className="flex items-center gap-5 mt-2">
          <button
            onClick={handleClick}
            type="button"
            value="recipes"
            className={`text-lg ${selected === 'recipes' ? 'border-b-4 border-orange-500 font-semibold' : ''}`}
          >
            Recipes
          </button>
          <button
            onClick={handleClick}
            type="button"
            value="users"
            className={`text-lg ${selected === 'users' ? 'border-b-4 border-orange-500 font-semibold' : ''}`}
          >
            Users
          </button>
        </div>
        <div>
          {`${selected}` === 'recipes' ? (
            <RecipeResults searchQuery={searchQuery} />
          ) : (
            <UserResults searchQuery={searchQuery} />
          )}
        </div>
      </MainLayout>

      <MobileNav />
    </div>
  );
}

export default Explore;
