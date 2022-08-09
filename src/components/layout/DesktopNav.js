import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon, SearchIcon, BookmarkIcon, UserCircleIcon, PlusCircleIcon,
} from '@heroicons/react/outline';
import AuthContext from '../../context/auth';

function DesktopNav() {
  const { authUser } = useContext(AuthContext);
  return (
    <nav className="hidden md:block">
      <div className="flex items-center justify-between gap-8">
        <NavLink to="/home" className="text-grey-500 flex items-center gap-2">
          <HomeIcon className="w-8 h-8" />
          {/* <p className="text-sm">Home</p> */}
        </NavLink>
        <NavLink to="/explore" className="text-grey-500 flex items-center gap-2">
          <SearchIcon className="w-8 h-8" />
          {/* <p className="text-sm">Explore</p> */}
        </NavLink>
        <NavLink to="/upload" className="text-grey-500 flex items-center gap-2">
          <PlusCircleIcon className="w-8 h-8" />
          {/* <p className="text-sm">Upload</p> */}
        </NavLink>
        <NavLink to="/saved" className="text-grey-500 flex items-center gap-2">
          <BookmarkIcon className="w-8 h-8" />
          {/* <p className="text-sm">Saved</p> */}
        </NavLink>
        <NavLink to={`/profile/${authUser.uid}`} className="text-grey-500  flex items-center gap-2">
          <UserCircleIcon className="w-8 h-8" />
          {/* <p className="text-sm">Profile</p> */}
        </NavLink>
      </div>
    </nav>
  );
}

export default DesktopNav;
