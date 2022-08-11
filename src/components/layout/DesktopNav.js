import { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  HomeIcon, SearchIcon, BookmarkIcon, UserCircleIcon, PlusCircleIcon,
} from '@heroicons/react/outline';
import AuthContext from '../../context/auth';

function DesktopNav() {
  const { authUser } = useContext(AuthContext);
  const currentRoute = useLocation().pathname;

  return (
    <nav className="hidden md:block">
      <div className="flex items-center justify-between gap-8">
        <NavLink to="/home">
          <HomeIcon className={`${currentRoute.includes('home') ? 'text-orange-500' : 'text-grey-700'} w-8 h-8`} />
        </NavLink>
        <NavLink to="/explore">
          <SearchIcon className={`${currentRoute.includes('explore') ? 'text-orange-500' : 'text-grey-700'} w-8 h-8`} />
        </NavLink>
        <NavLink to="/upload">
          <PlusCircleIcon className={`${currentRoute.includes('upload') ? 'text-orange-500' : 'text-grey-700'} w-8 h-8`} />
        </NavLink>
        <NavLink to="/saved">
          <BookmarkIcon className={`${currentRoute.includes('saved') ? 'text-orange-500' : 'text-grey-700'} w-8 h-8`} />
        </NavLink>
        <NavLink to={`/profile/${authUser.uid}`}>
          {authUser.photoUrl !== null ? (<img src={authUser.photoURL} alt={authUser.displayName} className="rounded-full h-9 w-9 border border-grey-100" />)
            : (<UserCircleIcon className={`${currentRoute.includes(`/profile/${authUser.uid}`) ? 'text-orange-500' : 'text-grey-700'} w-8 h-8`} />)}
        </NavLink>
      </div>
    </nav>
  );
}

export default DesktopNav;
