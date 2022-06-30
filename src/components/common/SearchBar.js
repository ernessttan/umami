import { SearchIcon, ChevronLeftIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';

function SearchBar({
  handleChange, toggleSearch, isSearching, closeSearch, searchQuery,
}) {
  return (
    <div className="p-4 mx-5 bg-textbox-grey rounded flex items-center">
      <div className="flex items-center gap-2 w-full">
        {isSearching === true ? <ChevronLeftIcon className="w-5 h-5" onClick={closeSearch} /> : <SearchIcon className="w-5 h-5" />}
        <input
          onKeyDown={toggleSearch}
          onChange={handleChange}
          className="grow bg-transparent"
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
  toggleSearch: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
  closeSearch: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
};

export default SearchBar;
