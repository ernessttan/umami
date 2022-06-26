import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

function AppHeader() {
  return (
    <header className="p-5 text-orange-500">
      <div className="container flex items-center">
        <Link to={ROUTES.FEED}>
          <img className="h-8 w-8" src="logo.svg" alt="Umami Icon" />
        </Link>
      </div>
    </header>
  );
}

export default AppHeader;
