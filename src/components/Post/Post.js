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
  docId,
  likes,
  comments,
  userLikedPhoto,
  id,
  imageUrl,
}) {
  return (
    <div className="mt-5 w-full flex flex-col">
      <Header username={username} />
      <Image src={imageUrl} />
      <Information title={title} dateCreated={dateCreated} />
      <Actions
        docId={docId}
        totalLikes={likes.length}
        likes={likes}
        totalComments={comments.length}
        comments={comments}
        userLikedPhoto={userLikedPhoto}
        id={id}
      />
    </div>
  );
}

Post.defaultProps = {
  likes: [],
  comments: [],
  userLikedPhoto: false,
  dateCreated: '',
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  dateCreated: PropTypes.string,
  username: PropTypes.string.isRequired,
  docId: PropTypes.string.isRequired,
  likes: PropTypes.arrayOf(PropTypes.arrayOf),
  comments: PropTypes.arrayOf(PropTypes.arrayOf),
  userLikedPhoto: PropTypes.bool,
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default Post;
