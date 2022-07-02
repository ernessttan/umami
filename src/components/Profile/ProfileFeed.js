import PropTypes from 'prop-types';
import RecipeCard from '../Common/RecipeCard';
import useUserPosts from '../../hooks/useUserPosts';

function ProfileFeed({ userId }) {
  // Get a users posts
  const posts = useUserPosts(userId);

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
    <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
      {userPosts}
    </div>
  );
}

ProfileFeed.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default ProfileFeed;
