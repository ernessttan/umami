import { useContext } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import AuthContext from '../../context/AuthContext';
import useUserProfile from '../../hooks/useUserProfile';

function Navbar() {
  const { activeUser } = useContext(AuthContext);
  const profile = useUserProfile(activeUser.displayName);

  return (
    <nav className="bg-navbar-fill w-full p-3 pl-5 pr-5 shadow sticky bottom-0 md:bg-white md:shadow-none md:order-1 md:w-1/3 md:h-screen md:top-10">
      {profile && (
        <div className="container flex items-center justify-between mx-auto md:flex-col">
          <Link className="flex items-center md:mt-3 md:mb-3 md:gap-2" to={ROUTES.FEED}>
            <img className="h-9 w-9" src="/icons/home.svg" alt="home icon" />
            <p className="hidden md:block">Home</p>
          </Link>
          <Link className="flex items-center md:mt-3 md:mb-3 md:gap-2" to={ROUTES.UPLOAD}>
            <img className="h-8 w-8 md:ml-1" src="/icons/post.svg" alt="post icon" />
            <p className="hidden md:block md:ml-1">Post</p>
          </Link>
          <Link
            className="flex items-center rounded-full h-9 w-9 md:mt-3 md:mb-3 md:gap-2"
            to={`/profile/${profile.username}`}
          >
            <img
              className="object-cover rounded-full h-full w-full md:ml-1"
              src={profile.avatarUrl ? profile.avatarUrl : '/icons/profile.svg'}
              alt="profile"
            />
            <p className="hidden md:block md:ml-1">Profile</p>
          </Link>
        </div>
      )}

    </nav>
  );
}

export default Navbar;
