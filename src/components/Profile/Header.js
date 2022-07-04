/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { isActiveUserFollowing, toggleFollow } from '../../firebase/services';

function Header({ profile, totalPosts }) {
  const { activeUser } = useContext(AuthContext);
  const [isFollowingUser, setIsFollowingUser] = useState(null);
  const [totalFollowers, setTotalFollowers] = useState(profile.followers.length);

  useEffect(() => {
    // Checks if active user is following a user
    const checkFollowing = async () => {
      const isFollowing = await isActiveUserFollowing(activeUser.uid, profile.id);
      setIsFollowingUser(isFollowing);
    };
    checkFollowing();
  }, [profile.id]);

  const handleFollow = async (event) => {
    const { value } = event.target;
    setIsFollowingUser((prevState) => !prevState);
    await toggleFollow(activeUser.uid, value, isFollowingUser);
    setTotalFollowers((prevTotalFollowers) => (isFollowingUser ? prevTotalFollowers - 1 : prevTotalFollowers + 1));
  };

  return (
    <>
      <div className="flex items-center gap-3 p-3">
        <img
          className="object-cover rounded-full h-20 w-16"
          src={profile.avatarUrl ? profile.avatarUrl : '/icons/profile.svg'}
          alt="user profile avatar"
        />
        <div>
          <p className="font-semibold">{profile.name}</p>
          <p className="text-grey-700">
            @
            {profile.username}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5 mt-2 pl-3">
        <h3 className="font-bold">
          {totalPosts}
          {' '}
          <span className="font-normal">Posts</span>
        </h3>
        <h3 className="font-bold">
          {totalFollowers}
          {' '}
          <span className="font-normal">Followers</span>
        </h3>
        <h3 className="font-bold">
          {profile.following.length}
          {' '}
          <span className="font-normal">Following</span>
        </h3>
      </div>
      <p className="py-2 ml-3">{profile.bio}</p>
      <div className="py-4">
        {activeUser.displayName === profile.username ? (
          <Link
            to={`/editprofile/${activeUser.uid}`}
            type="button"
            className="w-full md:w-1/2 bg-orange-500 text-white flex justify-center p-3 rounded-full"
          >
            Edit Profile
          </Link>
        ) : (
          <button onClick={handleFollow} type="button" value={profile.id} className="w-full md:w-1/2 bg-orange-500 text-white flex justify-center p-3 rounded-full">
            {isFollowingUser ? 'Unfollow' : 'Follow'}
          </button>
        )}
      </div>
    </>
  );
}

Header.defaultProps = {
  totalPosts: 0,
};

Header.propTypes = {
  profile: PropTypes.objectOf(PropTypes.any).isRequired,
  totalPosts: PropTypes.number,
};

export default Header;
