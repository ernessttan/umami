/* eslint-disable no-unused-vars */
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { signOut } from 'firebase/auth';
import { UserCircleIcon } from '@heroicons/react/outline';
import Header from '../../components/layout/Header';
import { FirebaseContext } from '../../context/firebase';
import UserContext from '../../context/user';
import useUserProfile from '../../hooks/useUserProfile';
import { isAuthUserFollowing, toggleFollow } from '../../firebase/functions';
import MobileNav from '../../components/layout/MobileNav';
import MainLayout from '../../components/layout/MainLayout';
import UserPosts from './UserPosts';

function Profile() {
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext);
  const { uid } = useParams();
  const { profile } = useUserProfile(uid);
  const [isFollowing, setIsFollowing] = useState(null);

  useEffect(() => {
    const setFollowing = async () => {
      try {
        await isAuthUserFollowing(auth.currentUser.uid, uid)
          .then((isFollowing) => {
            setIsFollowing(isFollowing);
          });
      } catch (error) {
        console.log(error.message);
      }
    };
    setFollowing();
  }, [uid]);

  const handleLogout = async () => {
    try {
      await signOut(auth)
        .then(() => {
          navigate('/');
        });
    } catch (error) {
      console.log(error);
    }
  };

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

  return profile && (
    <UserContext.Provider value={{ profile }}>
      <div className="hidden md:block">
        <Header />
      </div>
      <MainLayout className="p-3">
        <div className="flex items-center justify-end py-3">
          {auth.currentUser.uid === uid && (
          <button onClick={handleLogout} className="text-orange-500" type="button">
            Logout
          </button>
          )}
        </div>
        <div className="flex items-center px-2">
          {profile.avatar ? (<img src={profile.avatar} alt={profile.username} className="rounded-full h-16 w-16 border border-grey-100" />)
            : (<UserCircleIcon className="h-16 w-16" />)}
          <div className="ml-4">
            <p className="font-semibold">{profile.name}</p>
            <p className="text-grey-700">{`@ ${profile.username}`}</p>
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-center gap-5 w-full">
            <p className="text-black">
              <span className="font-semibold">{profile.posts.length}</span>
              {' '}
              Posts
            </p>
            <p className="text-black">
              <span className="font-semibold">{profile.followers.length}</span>
              {' '}
              Followers
            </p>
            <p className="text-black">
              <span className="font-semibold">{profile.following.length}</span>
              {' '}
              Following
            </p>
          </div>
          <p className="py-3">{profile.bio}</p>
          <div className="py-4">
            {auth.currentUser.uid === profile.uid ? (
              <Link
                to={`/editprofile/${auth.currentUser.uid}`}
                type="button"
                className="w-full md:w-1/2 bg-orange-500 text-white flex justify-center p-3 rounded-full"
              >
                Edit Profile
              </Link>
            ) : (
              <button onClick={handleFollow} type="button" value={profile.id} className="w-full md:w-1/2 bg-orange-500 text-white flex justify-center p-3 rounded-full">
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
        </div>
        <UserPosts uid={uid} />
      </MainLayout>
      <MobileNav />
    </UserContext.Provider>
  );
}

export default Profile;
