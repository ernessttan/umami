import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

function AppHeader() {
  return (
    <header className="text-orange-500 px-5">
      <div className="flex">
        <Link to={ROUTES.HOME}>
          <img className="h-8  w-8" src="/logo.svg" alt="Umami Icon" />
        </Link>
      </div>
    </header>
  );
}

export default AppHeader;
