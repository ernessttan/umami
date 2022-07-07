import { useState } from 'react';
import SearchBar from '../common/SearchBar';
import SelectSearch from './SelectSearch';
import SearchResults from './SearchResults';

function Search() {
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
    <div className="md:desktop-content">
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
  );
}
export default Search;
