import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function userCard({
  avatarUrl, name, username,
}) {
  return (
    <Link to={`/profile/${username}`} className="flex items-center gap-2">
      <img className="object-cover rounded-full h-8 w-8" src={avatarUrl} alt="user avatar" />
      <div>
        <p className="font-semibold">{name}</p>
        <p>{username}</p>
      </div>
    </Link>
  );
}

userCard.defaultProps = {
  name: '',
};

userCard.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default userCard;
