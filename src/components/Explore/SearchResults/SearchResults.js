import PropTypes from 'prop-types';
import UserResults from './UserResults';
import RecipeResults from './RecipeResults';

function SearchResults({ selected, searchQuery }) {
  return (
    <div>
      {`${selected}` === 'recipes' ? (
        <RecipeResults searchQuery={searchQuery} />
      ) : (
        <UserResults searchQuery={searchQuery} />
      )}
    </div>
  );
}

SearchResults.defaultProps = {
  searchQuery: '',
};

SearchResults.propTypes = {
  selected: PropTypes.string.isRequired,
  searchQuery: PropTypes.string,
};

export default SearchResults;
