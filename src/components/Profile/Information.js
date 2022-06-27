import PropTypes from 'prop-types';

function Information({ username }) {
  return (
    <div className="flex items-center gap-3 p-3">
      <img
        className="rounded-full h-8 w-8"
        src="/avatars/ernesttan.jpeg"
        alt="user profile avatar"
      />
      <p>{username}</p>
    </div>
  );
}

Information.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Information;
