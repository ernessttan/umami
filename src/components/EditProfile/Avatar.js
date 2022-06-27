import PropTypes from 'prop-types';

function Avatar({ avatarUrl }) {
  return (
    <div className="py-8 text-center">
      <img className="object-cover rounded-full h-24 w-24 mx-auto" src={avatarUrl} alt="user avatar" />
      <p className="font-semibold text-orange-500 mt-3">Edit Profile Picture</p>
    </div>
  );
}

Avatar.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
};

export default Avatar;
