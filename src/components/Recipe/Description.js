/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';

function Description({
  avatarUrl, username, description,
}) {
  return (
    <div className="px-5">
      <div className="flex items-center gap-2 py-5">
        <img className="object-cover h-8 w-8 rounded-full" src={avatarUrl} alt="user avatar" />
        <p className="font-semibold text-lg">{username}</p>
        {/* TODO: Add follow button */}
      </div>
      <p className="text-lg py-2">{description}</p>
    </div>
  );
}

Description.defaultProps = {
  avatarUrl: '/icons/profile.svg',
};

Description.propTypes = {
  avatarUrl: PropTypes.string,
  username: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Description;
