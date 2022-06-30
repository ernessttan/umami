import { SearchIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';

function SearchBar({ handleChange, toggleSearch }) {
  return (
    <div className="p-4 mx-5 bg-textbox-grey rounded flex items-center">
      <button onClick={toggleSearch} type="button" className="flex items-center gap-2 w-full">
        <SearchIcon className="w-5 h-5" />
        <input
          onChange={handleChange}
          className="grow bg-transparent"
          type="text"
          name="search"
          placeholder="Search"
        />
      </button>
    </div>

  );
}

SearchBar.propTypes = {
  handleChange: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
