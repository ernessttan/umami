import PropTypes from 'prop-types';
import formatDistance from 'date-fns/formatDistance';

function Comment({
  avatarUrl, comment, username, dateCreated,
}) {
  return (
    <div className="border-b-2 py-3">
      <div className="flex items-center gap-2">
        <img className="h-9 w-9 rounded-full" src={avatarUrl} alt="user avatar" />
        <div className="text-sm">
          <p>{username}</p>
          <p>
            {formatDistance(dateCreated, new Date())}
            {' '}
            ago
          </p>
        </div>
      </div>
      <p className="py-2">
        {comment}
      </p>
    </div>
  );
}

Comment.defaultProps = {
  avatarUrl: '/icons/profile.svg',
};

Comment.propTypes = {
  avatarUrl: PropTypes.string,
  comment: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  dateCreated: PropTypes.number.isRequired,
};

export default Comment;
