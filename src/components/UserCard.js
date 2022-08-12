import { UserCircleIcon } from '@heroicons/react/outline';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import FollowButton from './buttons/FollowButton';

function UserCard({
  uid, avatar, username, name,
}) {
  return (
    <div className="flex items-center justify-between">
      <Link to={`/profile/${uid}`} className="flex items-center gap-3">
        {
            avatar ? (
              <img src={avatar} alt={name} className="rounded-full w-10 h-10 object-cover border border-grey-100" />
            ) : (
              <UserCircleIcon className="w-10 h-10" />
            )
        }
        <div>
          <h4>{name}</h4>
          <p>{username}</p>
        </div>
      </Link>
      <FollowButton uid={uid} />
    </div>
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
