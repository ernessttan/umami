import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Header({ avatarUrl, username }) {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate(`/profile/${username}`);
  };

  return (
    <button type="button" onClick={goToProfile} className="flex items-center gap-2 px-5">
      <img src={avatarUrl || '/icons/profile.svg'} alt="user avatar" />
      <p>{username}</p>
    </button>
  );
}

Header.defaultProps = {
  avatarUrl: '/icons/profile.svg',
};

Header.propTypes = {
  username: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
};

export default Header;
