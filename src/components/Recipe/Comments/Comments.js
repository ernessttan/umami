/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { useState, createRef } from 'react';
import CommentList from './CommentList';
import CommentInput from './CommentInput';

function Comments({
  comments, recipeId,
}) {
  const [allComments, setAllComments] = useState(comments);
  const commentsRef = createRef();

  return (
    <div ref={commentsRef}>
      <CommentList comments={allComments} />
      <CommentInput comments={comments} setAllComments={setAllComments} recipeId={recipeId} />
    </div>
  );
}

Comments.defaultProps = {
  comments: [],
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  recipeId: PropTypes.string.isRequired,
};

export default Comments;
