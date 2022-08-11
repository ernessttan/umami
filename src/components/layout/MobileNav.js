import { useContext } from 'react';
import {
  HomeIcon, SearchIcon, BookmarkIcon, PlusCircleIcon, UserCircleIcon,
} from '@heroicons/react/outline';
import { NavLink, useLocation } from 'react-router-dom';
import AuthContext from '../../context/auth';

function MobileNav() {
  const { authUser } = useContext(AuthContext);
  const currentRoute = useLocation().pathname;

  console.log(authUser.photoURL);

  return (
    <nav className="p-3 w-full sticky bottom-0 z-30 shadow-xl bg-navbar-fill border-t border-grey-300 md:hidden">
      <div className="flex items-center justify-between px-3">
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

export default MobileNav;
