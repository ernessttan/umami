import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
import Image from './Image';
import Information from './Information';
import SocialBar from '../common/SocialBar';

// Component for Individual Post on Feed
function Post({
  title,
  dateCreated,
  username,
  likes,
  comments,
  userLikedPost,
  id,
  imageUrl,
  avatarUrl,
}) {
  return (
    <div className="mt-2 w-full flex flex-col">
      <Header avatarUrl={avatarUrl} username={username} />
      <Link to={`/recipe/${id}`}>
        <Image src={imageUrl} />
        <Information title={title} dateCreated={dateCreated} />
      </Link>
      <div className="pl-5">
        <SocialBar
          totalLikes={likes.length}
          totalComments={comments.length}
          userLikedPost={userLikedPost}
          id={id}
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
  likes: PropTypes.arrayOf(PropTypes.arrayOf),
  comments: PropTypes.arrayOf(PropTypes.arrayOf),
  userLikedPost: PropTypes.bool,
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
};

export default Post;
