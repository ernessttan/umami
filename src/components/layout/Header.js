import { Link } from 'react-router-dom';
import DesktopNav from './DesktopNav';

function Header() {
  return (
    <header className="flex items-center justify-between p-3 py-5 md:shadow md:bb-1 md:sticky">
      <Link to="home">
        <img src="/logo.svg" alt="Umami logo" className="w-8 h-8" />
      </Link>
      <DesktopNav />
    </header>
  );
}

export default Header;
