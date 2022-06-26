import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Header({ username }) {
  return (
    <Link to={`/profile/${username}`} className="flex items-center gap-3 p-3">
      <img
        className="rounded-full h-8 w-8"
        src="/avatars/ernesttan.jpeg"
        alt="user profile avatar"
      />
      <p>{username}</p>
    </Link>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Header;
