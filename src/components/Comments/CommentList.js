import PropTypes from 'prop-types';
import Comment from './Comment';

function CommentList({ comments }) {
  const commentList = comments.map((comment) => (
    <Comment
      key={comment.id}
      avatarUrl={comment.avatarUrl}
      username={comment.username}
      content={comment.content}
      dateCreated={comment.dateCreated}
    />
  ));

  return (
    <div className="px-5 py-5 overflow-y-scroll">
      {commentList}
    </div>
  );
}

CommentList.defaultProps = {
  comments: [],
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
};

export default CommentList;
