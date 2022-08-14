import { SearchIcon, ChevronLeftIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import { useState } from 'react';

function SearchBar({
  handleChange, searchQuery, setSearchQuery,
}) {
  const [isSearching, setIsSearching] = useState(false);

  const startSearch = () => {
    setIsSearching(true);
  };

  const closeSearch = () => {
    setIsSearching(false);
    setSearchQuery('');
  };

  return (
    <div className="p-4 bg-textbox-grey rounded flex items-center">
      <div className="flex items-center gap-2 w-full">
        {isSearching ? <ChevronLeftIcon className="w-5 h-5" onClick={closeSearch} /> : <SearchIcon className="w-5 h-5" />}
        <input
          onKeyDown={startSearch}
          onChange={handleChange}
          className="grow bg-transparent border-none outline-none p-0"
          type="text"
          name="search"
          value={searchQuery}
          placeholder="Search"
        />
      </div>
    </div>
  );
}

SearchBar.defaultProps = {
  searchQuery: '',
};

SearchBar.propTypes = {
  handleChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func.isRequired,
};

export default SearchBar;
