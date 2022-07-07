/* eslint-disable react/jsx-no-constructed-context-values */
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserProfileContext from '../context/UserProfileContext';
import useUser from '../hooks/useUser';
import UserProfile from '../components/Profile/Profile';
import Navbar from '../components/common/Navbar';
import AuthContext from '../context/AuthContext';
import BackButton from '../components/common/BackButton';
import SettingsBar from '../components/Profile/SettingsBar';

function Profile() {
  const { id } = useParams();
  const { authUser } = useContext(AuthContext);
  const { profile } = useUser(id);

  return profile ? (
    <div className="h-screen py-5 md:px-5 md:container md:max-w-screen-lg">
      {authUser.uid === profile.id ? (<SettingsBar />) : (<BackButton />)}
      <UserProfileContext.Provider value={{ profile }}>
        <div className="mt-5 md:desktop-screen">
          <UserProfile />
          <Navbar />
        </div>
      </UserProfileContext.Provider>
    </div>
  ) : null;
}

export default Profile;
