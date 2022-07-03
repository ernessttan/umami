import PropTypes from 'prop-types';

function Avatar({ avatarUrl }) {
  return (
    <div className="py-8 text-center">
      <label htmlFor="avatar" className="font-semibold text-orange-500 mt-3">
        <img className="object-cover rounded-full h-24 w-24 mx-auto" src={avatarUrl} alt="user avatar" />
        <input
          className="hidden"
          type="file"
          accept=".png, .jpg, .jpeg"
          name="avatar"
          id="avatar"
        />
        Edit Profile
      </label>
    </div>
  );
}

Avatar.defaultProps = {
  avatarUrl: '/icons/profile.svg',
};

Avatar.propTypes = {
  avatarUrl: PropTypes.string,
};

export default Avatar;
