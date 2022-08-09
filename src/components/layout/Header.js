import { Link } from 'react-router-dom';
import DesktopNav from './DesktopNav';

function Header() {
  return (
    <header className="p-3 shadow inset-0 bb-1 sticky bg-white z-30 md:px-8">
      <div className="flex items-center justify-between md:container md:max-w-5xl">
        <Link to="/home">
          <img src="/logo.svg" alt="Umami logo" className="w-8 h-8" />
        </Link>
        <DesktopNav />
      </div>
    </header>
  );
}

export default Header;
