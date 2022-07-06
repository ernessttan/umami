/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {
  BookmarkIcon, HomeIcon, SearchIcon, PlusCircleIcon, UserCircleIcon,
} from '@heroicons/react/outline';
import { useContext } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import UserProfileContext from '../../context/UserProfileContext';

function Navbar() {
  const profile = useContext(UserProfileContext);
  const currentRoute = useLocation().pathname;

  return (
    <div className="bg-navbar-fill py-5 px-4 shadow fixed bottom-0 w-full -mx-5 md:navbar-side md:shadow-none md:basis-1/4">
      <div className="flex items-center justify-between md:flex-col md:items-start">
        <NavLink
          to={ROUTES.HOME}
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
          to={`/profile/${profile.id}`}
          className={`${currentRoute.includes(`profile/${profile.id}`) ? 'text-orange-500' : 'text-grey-700'} flex items-center md:mt-3 md:mb-3 md:gap-2`}
        >
          {
            profile.avatarUrl === undefined
              ? (
                <UserCircleIcon className="navbar-icon" />
              )
              : (
                <img
                  className="object-cover rounded-full h-8 w-8"
                  src={profile.avatarUrl}
                  alt="user avatar"
                />
              )
          }
          <p className="hidden md:block">Profile</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
