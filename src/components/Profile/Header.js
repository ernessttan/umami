import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserProfileContext from '../../context/UserProfileContext';
import AuthContext from '../../context/AuthContext';
import { toggleFollow } from '../../firebase/services';

function Header({
  avatarUrl, username, totalFollowers, totalFollowing, totalPosts, name,
}) {
  const { authUser } = useContext(AuthContext);
  const { profile } = useContext(UserProfileContext);
  const [isFollowingUser, setIsFollowingUser] = useState(null);
  const [followersCount, setFollowersCount] = useState(totalFollowers);

  // Follow handler
  const handleFollow = async (event) => {
    const { value } = event.target;
    setIsFollowingUser((prevState) => !prevState);
    // Add auth user id to users followers array
    await toggleFollow(authUser.uid, value, isFollowingUser);
    // Increment count
    setFollowersCount((prevFollowersCount) => (isFollowingUser
      ? prevFollowersCount - 1 : prevFollowersCount + 1));
  };

  return (
    <>
      <div className="flex items-center gap-3 p-3">
        <img
          src={avatarUrl || '/icons/profile.svg'}
          alt="user avatar"
          className="rounded-full h-16 w-16"
        />
        <div>
          <p>{name}</p>
          <p className="text-grey-700">
            @
            {username}
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
          {followersCount}
          {' '}
          <span className="font-normal">Followers</span>
        </h3>
        <h3 className="font-bold">
          {totalFollowing}
          {' '}
          <span className="font-normal">Following</span>
        </h3>
      </div>
      <p className="py-2 ml-3">{profile.bio}</p>
      <div className="py-4">
        {authUser.displayName === profile.username ? (
          <Link
            to={`/editprofile/${authUser.uid}`}
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
  avatarUrl: '',
  name: '',
};

Header.propTypes = {
  avatarUrl: PropTypes.string,
  username: PropTypes.string.isRequired,
  name: PropTypes.string,
  totalFollowers: PropTypes.number.isRequired,
  totalFollowing: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
};

export default Header;
