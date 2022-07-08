/* eslint-disable react/jsx-no-constructed-context-values */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import * as ROUTES from './constants/routes';
import AuthContext from './context/AuthContext';
import useAuthUser from './hooks/useAuthUser';
import Loader from './components/common/Loader';

const Welcome = lazy(() => import('./pages/Welcome'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const Upload = lazy(() => import('./pages/Upload'));
const Profile = lazy(() => import('./pages/Profile'));
const Recipe = lazy(() => import('./pages/RecipePage'));
const EditProfile = lazy(() => import('./pages/EditProfile'));
const Explore = lazy(() => import('./pages/Explore'));
const Comments = lazy(() => import('./pages/CommentsPage'));

function App() {
  // Top Level provides all pages with authUser details
  // displayName, uid
  const { authUser } = useAuthUser();

  return (
    <AuthContext.Provider value={{ authUser }}>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path={ROUTES.WELCOME} element={<Welcome />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.LOG_IN} element={<Login />} />
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.UPLOAD} element={<Upload />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.RECIPE} element={<Recipe />} />
            <Route path={ROUTES.EDIT_PROFILE} element={<EditProfile />} />
            <Route path={ROUTES.EXPLORE} element={<Explore />} />
            <Route path={ROUTES.COMMENTS} element={<Comments />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthContext.Provider>

  );
}

export default App;
