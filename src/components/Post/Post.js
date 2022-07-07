import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
import Image from './Image';
import Information from './Information';
import SocialBar from '../common/SocialBar';

function Post({
  id, avatarUrl, username, imageUrl, title, dateCreated, likes, comments, userLikedPost,
}) {
  return (
    <>
      <Header
        avatarUrl={avatarUrl}
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

    </>
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
  imageUrl: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
};

export default Post;
