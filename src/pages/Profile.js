/* eslint-disable react/jsx-no-constructed-context-values */
import { useParams } from 'react-router-dom';
import UserProfileContext from '../context/UserProfileContext';
import useUser from '../hooks/useUser';
import UserProfile from '../components/Profile/Profile';
import Navbar from '../components/common/Navbar';

function Profile() {
  const { id } = useParams();
  const { profile } = useUser(id);

  return profile ? (
    <div className="h-screen py-5 md:px-5 md:container md:max-w-screen-lg">
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
