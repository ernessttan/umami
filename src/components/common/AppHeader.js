// import { Link } from 'react-router-dom';
// import * as ROUTES from '../../constants/routes';
import { useNavigate } from 'react-router-dom';

function AppHeader() {
  const routeHome = () => {
    useNavigate('/feed');
  };
  return (
    <header className="p-5 text-orange-500 md:shadow">
      <div className="flex">
        <button onClick={routeHome} type="button">
          <img className="h-8 w-8" src="/logo.svg" alt="Umami Icon" />
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
