import { useContext } from 'react';
import {
  HomeIcon, SearchIcon, BookmarkIcon, PlusCircleIcon, UserCircleIcon,
} from '@heroicons/react/outline';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth';

function MobileNav() {
  const { authUser } = useContext(AuthContext);

  return (
    <nav className="p-3 w-full sticky bottom-0 z-30 shadow-xl bg-navbar-fill border-t border-grey-300 md:hidden">
      <div className="flex items-center justify-between px-3">
        <NavLink to="/home">
          <HomeIcon className="text-grey-500 w-8 h-8" />
        </NavLink>
        <NavLink to="/explore">
          <SearchIcon className="text-grey-500 w-8 h-8" />
        </NavLink>
        <NavLink to="/upload">
          <PlusCircleIcon className="text-grey-500 w-8 h-8" />
        </NavLink>
        <NavLink to="/saved">
          <BookmarkIcon className="text-grey-500 w-8 h-8" />
        </NavLink>
        <NavLink to={`/profile/${authUser.uid}`}>
          <UserCircleIcon className="text-grey-500 w-8 h-8" />
        </NavLink>
      </div>
    </nav>

  );
}

export default MobileNav;
