import { UserCircleIcon } from '@heroicons/react/outline';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';

function UserCard({
  uid, avatar, username, name,
}) {
  return (
    <Link to={`/profile/${uid}`} className="flex items-center gap-3">
      {
            avatar ? (
              <img src={avatar} alt={name} className="rounded-full w-10 h-10 object-cover" />
            ) : (
              <UserCircleIcon className="w-10 h-10" />
            )
        }
      <div>
        <h4>{name}</h4>
        <p>{username}</p>
      </div>
    </Link>
  );
}

UserCard.defaultProps = {
  avatar: '',
  name: '',
};

UserCard.propTypes = {
  uid: Proptypes.string.isRequired,
  avatar: Proptypes.string,
  username: Proptypes.string.isRequired,
  name: Proptypes.string,
};

export default UserCard;
