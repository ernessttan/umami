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
      <SearchBar
        searchQuery={searchQuery}
        isSearching={isSearching}
        toggleSearch={startSearch}
        closeSearch={closeSearch}
        handleChange={handleChange}
      />
      <SelectSearch handleClick={handleClick} selected={selected} />
      <SearchResults
        selected={selected}
        searchQuery={searchQuery}
      />
      <Navbar className="mt-full" />
    </>
  );
}

export default Explore;
