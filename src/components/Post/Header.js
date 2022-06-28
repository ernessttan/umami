import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Header({ username, avatarUrl }) {
  const navigate = useNavigate();

  const routeToProfile = () => {
    navigate(`/profile/${username}`);
  };

  return (
    <button onClick={routeToProfile} type="button" className="flex items-center gap-3 p-3">
      <img
        className="object-cover rounded-full h-8 w-8"
        src={avatarUrl}
        alt="user profile avatar"
      />
      <p>{username}</p>
    </button>
  );
}

Header.defaultProps = {
  avatarUrl: '',
};

Header.propTypes = {
  username: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
};

export default Header;
