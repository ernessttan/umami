/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import AppHeader from '../components/Common/AppHeader';
import Navbar from '../components/Common/Navbar';
import SearchBar from '../components/Common/SearchBar';
import SelectSearch from '../components/Explore/SelectSearch';
import SearchResults from '../components/Explore/SearchResults/SearchResults';
import FirebaseContext from '../context/FireBaseContext';

function Explore() {
  // TODO: useExploreFeed hook
  const [isSearching, setIsSearching] = useState(false);
  const [selected, setSelected] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearch = () => (isSearching === false ? setIsSearching(true) : setIsSearching(false));

  const handleClick = (event) => {
    const { value } = event.target;
    setSelected(value);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  return (
    <>
      <AppHeader />
      <SearchBar
        toggleSearch={toggleSearch}
        handleChange={handleChange}
      />
      {
        isSearching === true ? (
          <>
            <SelectSearch handleClick={handleClick} selected={selected} />
            <SearchResults
              selected={selected}
              searchQuery={searchQuery}
            />
          </>
        ) : (
          <div />
          // <ExploreFeed />
        )
      }
      <Navbar className="mt-full" />
    </>
  );
}

export default Explore;
