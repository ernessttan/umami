import PropTypes from 'prop-types';
import RecipeCard from '../common/RecipeCard';

function Feed({ posts }) {
  const userPosts = posts.map((post) => (
    <RecipeCard
      key={post.id}
      id={post.id}
      imageUrl={post.imageUrl}
      title={post.title}
      totalLikes={post.likes.length}
    />
  ));
  return (
    <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {userPosts}
    </div>
  );
}

Feed.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Feed;
