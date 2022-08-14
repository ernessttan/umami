/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import { ThumbUpIcon, ChatIcon, BookmarkIcon } from '@heroicons/react/outline';
import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth';
import { toggleLike, toggleSave } from '../../firebase/functions';
import Comments from './Comments';

function Actions({
  likes, comments, authUserLiked, authUserSaved, rid,
}) {
  const { authUser } = useContext(AuthContext);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [commentsCount, setCommentsCount] = useState(comments.length);
  const [isLiked, setIsLiked] = useState(authUserLiked);
  const [isSaved, setIsSaved] = useState(authUserSaved);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const toggleComments = () => setIsCommentsOpen(!isCommentsOpen);

  const handleToggleLike = async () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    await toggleLike(authUser.uid, rid, isLiked)
      .then(() => {
        setLikesCount((prevLikesCount) => (isLiked ? prevLikesCount - 1 : prevLikesCount + 1));
      });
  };

  const handleToggleSave = async () => {
    setIsSaved((prevIsSaved) => !prevIsSaved);
    await toggleSave(authUser.uid, rid, isSaved);
    // Display success message
  };

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center">
          <button onClick={handleToggleLike} type="button">
            <ThumbUpIcon className={`h-6 w-6 ${isLiked ? 'fill-orange-100' : ''}`} />
          </button>
          <p>{likesCount}</p>
        </div>
        <div className="flex flex-col items-center">
          <button onClick={toggleComments} type="button" className="h-6 w-6">
            <ChatIcon />
          </button>
          <p>{commentsCount}</p>
          <Comments
            rid={rid}
            modalIsOpen={isCommentsOpen}
            toggleComments={toggleComments}
            comments={comments}
            setCommentsCount={setCommentsCount}
          />
        </div>
      </div>
      <button onClick={handleToggleSave} type="button">
        <BookmarkIcon className={`h-6 w-6 ${isSaved ? 'fill-orange-100' : ''}`} />
        {/* <SaveMenu /> */}
      </button>
    </div>

  );
}

Actions.defaultProps = {
  likes: [],
  comments: [],
};

Actions.propTypes = {
  likes: PropTypes.arrayOf(PropTypes.string),
  comments: PropTypes.arrayOf(PropTypes.shape({
    cid: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    comment: PropTypes.string.isRequired,
  })),
  authUserLiked: PropTypes.bool.isRequired,
  authUserSaved: PropTypes.bool.isRequired,
  rid: PropTypes.string.isRequired,
};

export default Actions;
