import { UserCircleIcon } from '@heroicons/react/outline';
import Proptypes from 'prop-types';

function UserCard({
  uid, avatar, username, name,
}) {
  return (
    <div id={uid} className="flex items-center gap-3">
      {
            avatar ? (
              <img src={avatar} alt={name} className="rounded-full w-10 h-10 object-cover" />
            ) : (
              <UserCircleIcon className="w-10 h-10" />
            )
        }
      <div>
        <h3>{name}</h3>
        <p>{username}</p>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  uid: Proptypes.string.isRequired,
  avatar: Proptypes.string.isRequired,
  username: Proptypes.string.isRequired,
  name: Proptypes.string.isRequired,
};

export default UserCard;
