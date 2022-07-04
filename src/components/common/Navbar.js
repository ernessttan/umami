import { useContext } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import {
  BookmarkIcon, HomeIcon, SearchIcon, UserCircleIcon, PlusCircleIcon,
} from '@heroicons/react/outline';
import * as ROUTES from '../../constants/routes';
import AuthContext from '../../context/AuthContext';

function Navbar() {
  const { activeUser } = useContext(AuthContext);
  const currentRoute = useLocation().pathname;

  return (
    <nav className="bg-navbar-fill w-full p-3 pl-5 pr-5 shadow fixed bottom-0 md:shadow-none md:order-first md:navbar-side md:basis-1/4 z-50">
      <div className="flex items-center justify-between md:flex-col md:items-start">
        <NavLink
          to={ROUTES.FEED}
          className={`${currentRoute.includes('feed') ? 'text-orange-500' : 'text-grey-700'} flex items-center md:mt-3 md:mb-3 md:gap-2`}
        >
          <HomeIcon className="navbar-icon" />
          <p className="hidden md:block">Home</p>
        </NavLink>
        <NavLink
          to={ROUTES.EXPLORE}
          className={`${currentRoute.includes('explore') ? 'text-orange-500' : 'text-grey-700'} flex items-center md:mt-3 md:mb-3 md:gap-2`}
        >
          <SearchIcon className="navbar-icon" />
          <p className="hidden md:block">Explore</p>
        </NavLink>
        <NavLink
          to={ROUTES.UPLOAD}
          className={`${currentRoute.includes('upload') ? 'text-orange-500' : 'text-grey-700'} flex items-center md:mt-3 md:mb-3 md:gap-2`}
        >
          <PlusCircleIcon className="navbar-icon" />
          <p className="hidden md:block">Post</p>
        </NavLink>
        <NavLink
          to={ROUTES.SAVED}
          className={`${currentRoute.includes('saved') ? 'text-orange-500' : 'text-grey-700'} flex items-center md:mt-3 md:mb-3 md:gap-2`}
        >
          <BookmarkIcon className="navbar-icon" />
          <p className="hidden md:block">Explore</p>
        </NavLink>
        <NavLink
          to={`/profile/${activeUser.uid}`}
          className={`${currentRoute.includes('profile') ? 'text-orange-500' : 'text-grey-700'} flex items-center md:mt-3 md:mb-3 md:gap-2`}
        >
          {
            activeUser.photoUrl === undefined
              ? (
                <UserCircleIcon className="navbar-icon" />
              )
              : (
                <img
                  className="object-cover rounded-full h-8 w-8"
                  src={activeUser.photoUrl}
                  alt="user avatar"
                />
              )
          }
          <p className="hidden text-grey-700 md:block">Profile</p>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
