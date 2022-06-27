import PropTypes from 'prop-types';

function EditForm({
  name, username, bio, handleChange,
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3>Name</h3>
      <input
        className="bg-textbox-grey rounded-lg py-3 px-2"
        onChange={handleChange}
        name="name"
        defaultValue={name}
      />
      <h3>Username</h3>
      <input
        className="bg-textbox-grey rounded-lg py-3 px-2"
        onChange={handleChange}
        name="username"
        defaultValue={username}
      />
      <h3>Bio</h3>
      <textarea
        className="bg-textbox-grey rounded-lg py-3 px-2"
        onChange={handleChange}
        name="bio"
        defaultValue={bio}
      />
      {/* <h2>Website</h2>
        <input className="bg-textbox-grey rounded-lg py-3" /> */}
    </div>
  );
}

EditForm.defaultProps = {
  name: '',
  bio: '',
};

EditForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  bio: PropTypes.string,
  username: PropTypes.string.isRequired,
};

export default EditForm;
