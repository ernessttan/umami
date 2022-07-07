/* eslint-disable react/jsx-no-constructed-context-values */
import { useContext } from 'react';
import AppHeader from '../components/common/AppHeader';
import Comments from '../components/Comments/Comments';
import Navbar from '../components/common/Navbar';
import AuthContext from '../context/AuthContext';
import useUser from '../hooks/useUser';
import UserProfileContext from '../context/UserProfileContext';

function CommentsPage() {
  const { authUser } = useContext(AuthContext);
  const { profile } = useUser(authUser.uid);

  return profile ? (
    <div className="h-screen py-5 md:px-5 md:container md:max-w-screen-lg">
      <div className="hidden md:block md:px-5">
        <AppHeader />
      </div>
      <UserProfileContext.Provider value={{ profile }}>
        <div className="h-full mt-5 px-5 md:desktop-screen">
          <Comments />
          <div className="hidden md:block md:order-first md:basis-1/3">
            <Navbar />
          </div>
        </div>
      </UserProfileContext.Provider>

    </div>
  ) : null;
}

export default CommentsPage;
