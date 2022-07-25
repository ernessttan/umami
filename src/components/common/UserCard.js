import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function userCard({
  avatarUrl, name, id, username,
}) {
  return (
    <Link to={`/profile/${id}`} className="flex items-center gap-2">
      <img className="object-cover rounded-full h-10 w-10" src={avatarUrl || '/icons/profile.svg'} alt="user avatar" />
      <div>
        <p className="font-semibold">{name}</p>
        <p>{username}</p>
      </div>
    </Link>
  );
}

userCard.defaultProps = {
  name: '',
  avatarUrl: '/icons/profile.svg',
};

userCard.propTypes = {
  avatarUrl: PropTypes.string,
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default userCard;
