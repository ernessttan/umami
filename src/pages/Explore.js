import { useState } from 'react';
import AppHeader from '../components/Common/AppHeader';
import Navbar from '../components/Common/Navbar';
import SearchBar from '../components/Common/SearchBar';
import SelectSearch from '../components/Explore/SelectSearch';
import SearchResults from '../components/Explore/SearchResults/SearchResults';

function Explore() {
  const [isSearching, setIsSearching] = useState(false);
  const [selected, setSelected] = useState('recipes');
  const [searchQuery, setSearchQuery] = useState('');

  const startSearch = () => {
    setIsSearching(true);
  };

  const closeSearch = () => {
    setIsSearching(false);
    setSearchQuery('');
  };

  const handleClick = (event) => {
    const { value } = event.target;
    setSelected(value);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value.toLowerCase());
  };

  return (
    <>
      <AppHeader />
      <div className="h-full md:app-container">
        <div className="grow-1 basis-3/4 py-5">
          <SearchBar
            searchQuery={searchQuery}
            isSearching={isSearching}
            startSearch={startSearch}
            closeSearch={closeSearch}
            handleChange={handleChange}
          />
          <SelectSearch handleClick={handleClick} selected={selected} />
          <SearchResults
            selected={selected}
            searchQuery={searchQuery}
          />
        </div>

        <Navbar className="mt-full" />
      </div>

    </>
  );
}

export default Explore;
