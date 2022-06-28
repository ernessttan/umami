import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import useUserProfile from '../../hooks/useUserProfile';

function Actions() {
  const { activeUser } = useContext(AuthContext);
  const { avatarUrl } = useUserProfile(activeUser.displayName);
  return (
    <div className="sticky bottom-0 flex items-center bg-textbox-grey rounded py-3 px-4">
      <img className="object-cover w-8 h-8 rounded-full" src={avatarUrl} alt="user avatar" />
      <input className="border-none bg-transparent" type="text" placeholder="Add a comment..." />
    </div>
  );
}

export default Actions;
