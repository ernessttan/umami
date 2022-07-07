import BackButton from '../common/BackButton';

function Header() {
  return (
    <div className="flex items-center gap-2">
      <BackButton />
      <h1>Comments</h1>
    </div>
  );
}

export default Header;
