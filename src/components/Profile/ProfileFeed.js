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
    <div className="grid grid-cols-2 gap-2 mt-5 justify-items-center">
      {userPosts}
    </div>
  );
}

ProfileFeed.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default ProfileFeed;
