import PropTypes from 'prop-types';

function Information({ username, avatarUrl, name }) {
  return (
    <div className="flex items-center gap-3 p-3">
      <img
        className="object-cover rounded-full h-16 w-16"
        src={avatarUrl}
        alt="user profile avatar"
      />
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-grey-700">
          @
          {username}
        </p>
      </div>
    </div>
  );
}

Information.defaultProps = {
  avatarUrl: '/icons/profile.svg',
};

Information.propTypes = {
  username: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default Information;
