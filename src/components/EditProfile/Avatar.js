import PropTypes from 'prop-types';

function Avatar({ avatarUrl, setUserProfile, setAvatarImage }) {
  const handleChange = (event) => {
    setUserProfile((prevUserProfile) => ({
      ...prevUserProfile,
      avatarUrl: URL.createObjectURL(event.target.files[0]),
    }));
    setAvatarImage(event.target.files[0]);
  };
  return (
    <div className="py-8 text-center">
      <label htmlFor="avatar" className="font-semibold text-orange-500 mt-3">
        <img
          src={avatarUrl || '/icons/profile.svg'}
          alt="user avatar"
          className="object-cover rounded-full h-24 w-24 mx-auto mb-2"
        />
        <input
          className="hidden"
          type="file"
          accept=".png, .jpg, .jpeg"
          name="avatarUrl"
          id="avatar"
          onChange={handleChange}
        />
        Edit Profile
      </label>
    </div>
  );
}

Avatar.defaultProps = {
  avatarUrl: '',
};

Avatar.propTypes = {
  setAvatarImage: PropTypes.func.isRequired,
  setUserProfile: PropTypes.func.isRequired,
  avatarUrl: PropTypes.string,
};

export default Avatar;
