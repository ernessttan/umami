/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import AppHeader from '../components/common/AppHeader';
import AuthContext from '../context/AuthContext';
import { getUserById } from '../firebase/services';
import UserProfile from '../components/Profile/Profile';

function Profile() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState();

  // Updates when id changes
  useEffect(() => {
    const getUserProfile = async () => {
      const profile = await getUserById(id);
      if (profile?.id) {
        setUserProfile(profile);
      }
    };
    getUserProfile();
  }, [id]);

  // Loads userProfile first before rendering components
  return userProfile?.id ? (
    <>
      <div className="hidden md:block">
        <AppHeader />
      </div>
      <div className="h-full md:app-container md:container md:max-w-screen-lg">
        <UserProfile profile={userProfile} />
        <Navbar />
      </div>
    </>
  ) : null;
}

export default Profile;
