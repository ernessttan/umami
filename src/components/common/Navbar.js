import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  BookmarkIcon, HomeIcon, SearchIcon, UserCircleIcon,
} from '@heroicons/react/outline';
import * as ROUTES from '../../constants/routes';
import AuthContext from '../../context/AuthContext';

function Navbar() {
  const { activeUser } = useContext(AuthContext);

  return (
    <nav className="bg-navbar-fill w-full p-3 pl-5 pr-5 shadow fixed bottom-0 md:shadow-none md:order-first md:navbar-side md:basis-1/4">
      <div className="flex items-center justify-between md:flex-col md:items-start">
        <Link className="flex items-center md:mt-3 md:mb-3 md:gap-2" to={ROUTES.FEED}>
          <HomeIcon className="navbar-icon" />
          <p className="hidden md:block">Home</p>
        </Link>
        <Link className="flex items-center md:mt-3 md:mb-3 md:gap-2" to={ROUTES.EXPLORE}>
          <SearchIcon className="navbar-icon" />
          <p className="hidden md:block">Explore</p>
        </Link>
        <Link className="flex items-center md:mt-3 md:mb-3 md:gap-2" to={ROUTES.UPLOAD}>
          <img className="h-8 w-8 md:ml-1" src="/icons/post.svg" alt="post icon" />
          <p className="hidden md:block md:ml-1">Post</p>
        </Link>
        <Link className="flex items-center md:mt-3 md:mb-3 md:gap-2" to={ROUTES.SAVED}>
          <BookmarkIcon className="navbar-icon" />
          <p className="hidden md:block">Explore</p>
        </Link>
        <Link
          className="flex items-center rounded-full h-9 w-9 md:mt-3 md:mb-3 md:gap-2"
          to={`/profile/${activeUser.displayName}`}
        >
          {
            activeUser.photoUrl
              ? (
                <img
                  className="object-cover rounded-full h-8 w-8 md:ml-1"
                  src={activeUser.photoUrl}
                  alt="user avatar"
                />
              )
              : (<UserCircleIcon className="navbar-icon h-8 w-8" />)
          }
          <p className="hidden md:block md:ml-1">Profile</p>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
