import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from './components/Common/Loader';
import * as ROUTES from './constants/routes';
import AuthContextProvider from './context/AuthContextProvider';

const Welcome = lazy(() => import('./pages/Welcome'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Login = lazy(() => import('./pages/Login'));
const Feed = lazy(() => import('./pages/Feed'));
const Upload = lazy(() => import('./pages/Upload'));
const Profile = lazy(() => import('./pages/Profile'));
const EditProfile = lazy(() => import('./pages/EditProfile'));
const Recipe = lazy(() => import('./pages/Recipe'));
const Explore = lazy(() => import('./pages/Explore'));
const Saved = lazy(() => import('./pages/Saved'));
const Comments = lazy(() => import('./pages/Comments'));

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path={ROUTES.WELCOME} element={<Welcome />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.LOG_IN} element={<Login />} />
            <Route path={ROUTES.FEED} element={<Feed />} />
            <Route path={ROUTES.UPLOAD} element={<Upload />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.EDIT_PROFILE} element={<EditProfile />} />
            <Route path={ROUTES.RECIPE} element={<Recipe />} />
            <Route path={ROUTES.EXPLORE} element={<Explore />} />
            <Route path={ROUTES.SAVED} element={<Saved />} />
            <Route path={ROUTES.COMMENTS} element={<Comments />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
