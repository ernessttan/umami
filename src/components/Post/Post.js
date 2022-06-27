import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
import Image from './Image';
import Information from './Information';
import Actions from './Actions';

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
    <Link to={`/recipe/${id}`} className="mt-2 w-full flex flex-col">
      <Header avatarUrl={avatarUrl} username={username} />
      <Image src={imageUrl} />
      <Information title={title} dateCreated={dateCreated} />
      <div className="pl-5">
        <Actions
          totalLikes={likes.length}
          likes={likes}
          totalComments={comments.length}
          comments={comments}
          userLikedPost={userLikedPost}
          id={id}
        />
      </div>

    </Link>
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
