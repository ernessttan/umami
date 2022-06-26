import PropTypes from 'prop-types';
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
    <div className="mt-2 w-full flex flex-col">
      <Header avatarUrl={avatarUrl} username={username} />
      <Image src={imageUrl} />
      <Information title={title} dateCreated={dateCreated} />
      <Actions
        totalLikes={likes.length}
        likes={likes}
        totalComments={comments.length}
        comments={comments}
        userLikedPost={userLikedPost}
        id={id}
      />
    </div>
  );
}

Post.defaultProps = {
  likes: [],
  comments: [],
  userLikedPost: false,
  dateCreated: '',
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  dateCreated: PropTypes.string,
  username: PropTypes.string.isRequired,
  likes: PropTypes.arrayOf(PropTypes.arrayOf),
  comments: PropTypes.arrayOf(PropTypes.arrayOf),
  userLikedPost: PropTypes.bool,
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
};

export default Post;
