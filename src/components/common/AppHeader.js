import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import * as ROUTES from '../../constants/routes';
import FirebaseContext from '../../context/FireBaseContext';

function AppHeader() {
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext);
  const handleLogOut = () => {
    signOut(auth).then(() => {
      console.log('Logged Out');
      navigate('/');
    });
  };
  return (
    <header className="p-5 text-orange-500">
      <div className="container flex items-center">
        <Link to={ROUTES.FEED}>
          <img className="h-8 w-8" src="logo.svg" alt="Umami Icon" />
        </Link>
      </div>
      <button type="button" onClick={handleLogOut}>
        Log Out
      </button>
    </header>
  );
}

export default AppHeader;
