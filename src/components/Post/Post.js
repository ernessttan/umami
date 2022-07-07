import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
import Image from './Image';
import Information from './Information';
import SocialBar from '../common/SocialBar';
import useUser from '../../hooks/useUser';

function Post({
  id, username, imageUrl, title, dateCreated, likes, comments, userLikedPost, userId,
}) {
  const { profile } = useUser(userId);

  return (
    <div>
      <Header
        avatarUrl={profile?.avatarUrl}
        username={username}
      />
      <Link to={`/recipe/${id}`}>
        <Image
          imageUrl={imageUrl}
        />
      </Link>
      <div className="px-5 py-3">
        <Information
          title={title}
          dateCreated={dateCreated}
        />
        <SocialBar
          id={id}
          totalLikes={likes.length}
          totalComments={comments.length}
          userLikedPost={userLikedPost}
        />
      </div>

    </div>
  );
}

Post.defaultProps = {
  likes: [],
  comments: [],
  userLikedPost: false,
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  dateCreated: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  likes: PropTypes.arrayOf(PropTypes.object),
  comments: PropTypes.arrayOf(PropTypes.object),
  userLikedPost: PropTypes.bool,
  id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default Post;
