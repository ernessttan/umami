/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import useAuthListener from './hooks/useAuthListener';
import AuthContext from './context/auth';

const Welcome = lazy(() => import('./pages/Welcome'));
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
// const Home = lazy(() => import('./pages/Home'));
// const Upload = lazy(() => import('./pages/Upload'));
// const Profile = lazy(() => import('./pages/Profile'));
// const Recipe = lazy(() => import('./pages/RecipePage'));
// const EditProfile = lazy(() => import('./pages/EditProfile'));
// const Explore = lazy(() => import('./pages/Explore'));
// const Comments = lazy(() => import('./pages/CommentsPage'));

function App() {
  const { authUser } = useAuthListener();

  return (
    <AuthContext.Provider value={{ authUser }}>
      <Router>
        <Suspense fallback={<div>Loading</div>}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            {/* <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.LOG_IN} element={<Login />} />
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.UPLOAD} element={<Upload />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.RECIPE} element={<Recipe />} />
            <Route path={ROUTES.EDIT_PROFILE} element={<EditProfile />} />
            <Route path={ROUTES.EXPLORE} element={<Explore />} />
            <Route path={ROUTES.COMMENTS} element={<Comments />} /> */}
          </Routes>
        </Suspense>
      </Router>
    </AuthContext.Provider>

  );
}

export default App;
