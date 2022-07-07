import BackButton from '../common/BackButton';

function Header() {
  return (
    <div className="flex items-center">
      <BackButton />
      <h1>Edit Profile</h1>
      <button type="submit" className="text-orange-500 ml-auto">
        Save
      </button>
    </div>
  );
}

export default Header;
