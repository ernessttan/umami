/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { ThumbUpIcon, ChatIcon } from '@heroicons/react/outline';
import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth';
import { toggleLike } from '../../firebase/functions';
import Comments from './Comments';

function Actions({
  likes, comments, authUserLiked, rid,
}) {
  const { authUser } = useContext(AuthContext);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [commentsCount, setComments] = useState(comments.length);
  const [isLiked, setIsLiked] = useState(authUserLiked);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const toggleComments = () => setIsCommentsOpen(!isCommentsOpen);

  const handleToggleLike = async () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    await toggleLike(authUser.uid, rid, isLiked)
      .then(() => {
        setLikesCount((prevLikesCount) => (isLiked ? prevLikesCount - 1 : prevLikesCount + 1));
      });
  };

  return (
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
        />
      </div>
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
    avatar: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
  })),
  authUserLiked: PropTypes.bool.isRequired,
  rid: PropTypes.string.isRequired,
};

export default Actions;
