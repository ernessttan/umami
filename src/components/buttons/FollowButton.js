import { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FirebaseContext } from '../../context/firebase';
import { isAuthUserFollowing, toggleFollow } from '../../firebase/functions';

function FollowButton({ uid }) {
  const { auth } = useContext(FirebaseContext);
  const [isFollowing, setIsFollowing] = useState(null);

  useEffect(() => {
    const isAuthUserFollowingProfile = async () => {
      const isFollowing = await isAuthUserFollowing(auth.currentUser.uid, uid);
      setIsFollowing(isFollowing);
    };

    if (auth.currentUser.uid !== uid) {
      isAuthUserFollowingProfile();
    }
  }, []);

  const handleFollow = async (e) => {
    e.preventDefault();
    try {
      await toggleFollow(auth.currentUser.uid, uid)
        .then(() => {
          setIsFollowing(!isFollowing);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button onClick={handleFollow} type="button" className="text-orange-500">
      {isFollowing ? ('Unfollow') : ('Follow')}
    </button>
  );
}

FollowButton.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default FollowButton;
