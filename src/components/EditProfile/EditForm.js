import PropTypes from 'prop-types';

function EditForm({
  setUserProfile, userProfile,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserProfile((prevUserProfile) => ({
      ...prevUserProfile,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-2">
      <h3>Name</h3>
      <input
        className="bg-textbox-grey rounded-lg py-3 px-2"
        onChange={handleChange}
        name="name"
        value={userProfile.name}
      />
      <h3>Username</h3>
      <input
        className="bg-textbox-grey rounded-lg py-3 px-2"
        onChange={handleChange}
        name="username"
        value={userProfile.username}
      />
      <h3>Bio</h3>
      <textarea
        className="bg-textbox-grey rounded-lg py-3 px-2"
        onChange={handleChange}
        name="bio"
        value={userProfile.bio}
      />
    </div>
  );
}

EditForm.propTypes = {
  setUserProfile: PropTypes.func.isRequired,
  userProfile: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default EditForm;
