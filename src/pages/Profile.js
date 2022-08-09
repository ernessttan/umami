import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { signOut } from 'firebase/auth';
import { FirebaseContext } from '../context/firebase';
import UserContext from '../context/user';
import useUserProfile from '../hooks/useUserProfile';
import { getUserPosts } from '../firebase/functions';
import RecipeCard from '../components/RecipeCard';
import MobileNav from '../components/layout/MobileNav';
import Header from '../components/layout/Header';

function Profile() {
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext);
  const { uid } = useParams();
  const { profile } = useUserProfile(uid);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        await getUserPosts(uid)
          .then((posts) => {
            setUserPosts(posts);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserPosts();
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

  return profile && (
    <UserContext.Provider value={{ profile }}>
      <div className="hidden md:block">
        <Header />
      </div>
      <div className="p-3 h-screen md:container md:max-w-4xl">
        <div className="flex items-center justify-end py-3">
          <button onClick={handleLogout} className="text-orange-500" type="button">
            Logout
          </button>
        </div>
        <div className="flex items-center">
          <img src={profile.avatarUrl} alt={profile.username} className="rounded-full h-16 w-16" />
          <div className="ml-4">
            <p className="font-semibold">{profile.name}</p>
            <p className="text-grey-700">{`@ ${profile.username}`}</p>
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-center gap-5 w-full">
            <p className="text-black">
              <span className="font-semibold">{userPosts.length}</span>
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
              <button type="button" value={profile.id} className="w-full md:w-1/2 bg-orange-500 text-white flex justify-center p-3 rounded-full">
                {/* {isFollowingUser ? 'Unfollow' : 'Follow'} */}
              </button>
            )}
          </div>
          {userPosts && (
            <div className="grid grid-cols-2 gap-8 py-5 md:grid-cols-3">
                {userPosts.map((post) => (
                  <RecipeCard
                    key={post.id}
                    title={post.title}
                    image={post.imageUrl}
                    id={post.id}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
      <MobileNav />
    </UserContext.Provider>
  );
}

export default Profile;
