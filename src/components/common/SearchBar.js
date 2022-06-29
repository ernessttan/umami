import { SearchIcon } from '@heroicons/react/outline';

function SearchBar() {
  return (
    <div className="p-4 mx-5 flex items-center gap-2 bg-textbox-grey rounded ">
      <SearchIcon className="w-5 h-5" />
      <input
        className="grow bg-transparent"
        type="text"
        name="search"
        placeholder="Search"
      />
    </div>

  );
}

export default SearchBar;
