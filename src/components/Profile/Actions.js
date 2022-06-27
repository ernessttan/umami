import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import * as ROUTES from '../../constants/routes';
import { isActiveUserFollowing, toggleFollow } from '../../firebase/services';

function Actions({ username, userId }) {
  const { activeUser } = useContext(AuthContext);
  const [isFollowingUser, setIsFollowingUser] = useState(null);

  useEffect(() => {
    // Checks if active user is following a user
    const checkFollowing = async () => {
      const isFollowing = await isActiveUserFollowing(activeUser.uid, userId);
      setIsFollowingUser(isFollowing);
    };
    checkFollowing();
  }, [userId]);

  // TODO: Click handler to follow a user
  // When clicked text should change to unfollow
  // userId from value of button needs to be added to following array
  const handleFollow = async (event) => {
    const { value } = event.target;
    setIsFollowingUser((prevState) => !prevState);
    await toggleFollow(activeUser.uid, value, isFollowingUser);
  };

  return (
    <div>
      <div>
        {activeUser.displayName === username ? (
          <Link
            to={ROUTES.EDIT_PROFILE}
            type="button"
            className="w-full bg-orange-500 text-white flex justify-center p-3 rounded-full"
          >
            Edit Profile
          </Link>
        ) : (
          <button onClick={handleFollow} type="button" value={userId} className="w-full bg-orange-500 text-white flex justify-center p-3 rounded-full">
            {isFollowingUser ? 'Unfollow' : 'Follow'}
          </button>
        )}
      </div>
    </div>
  );
}

Actions.propTypes = {
  username: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default Actions;
