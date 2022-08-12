import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthUserFollowing, toggleFollow } from '../../firebase/functions';

function Actions({
  currentUser, profile, uid,
}) {
  const [isFollowing, setIsFollowing] = useState(null);

  useEffect(() => {
    const isAuthUserFollowingProfile = async () => {
      const isFollowing = await isAuthUserFollowing(currentUser.uid, uid);
      setIsFollowing(isFollowing);
    };
    if (currentUser.uid !== uid) {
      isAuthUserFollowingProfile();
    }
  }, [uid]);

  const handleFollow = async (e) => {
    e.preventDefault();
    try {
      await toggleFollow(currentUser.uid, uid)
        .then(() => {
          setIsFollowing(!isFollowing);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-4">
      {currentUser.uid === profile.uid ? (
        <Link
          to={`/editprofile/${currentUser.uid}`}
          type="button"
          className="w-full md:w-1/2 bg-orange-500 text-white flex justify-center p-3 rounded-full"
        >
          Edit Profile
        </Link>
      ) : (
        <button onClick={handleFollow} type="button" value={profile.uid} className="w-full md:w-1/2 bg-orange-500 text-white flex justify-center p-3 rounded-full">
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      )}
    </div>
  );
}

Actions.propTypes = {
  currentUser: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  uid: PropTypes.string.isRequired,
};

export default Actions;
