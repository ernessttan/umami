import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
<<<<<<< HEAD
import useAuthListener from './hooks/useAuthListener';
import AuthContext from './context/auth';
import Loader from './components/layout/Loader';

const Welcome = lazy(() => import('./pages/onboarding/Welcome'));
const Signup = lazy(() => import('./pages/onboarding/Signup'));
const Login = lazy(() => import('./pages/onboarding/Login'));
const Home = lazy(() => import('./pages/home/Home'));
const Upload = lazy(() => import('./pages/upload/Upload'));
const Profile = lazy(() => import('./pages/profile/Profile'));
const EditProfile = lazy(() => import('./pages/editprofile/EditProfile'));
=======
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
const EditRecipe = lazy(() => import('./pages/EditRecipe'));
>>>>>>> main
const Explore = lazy(() => import('./pages/Explore'));
const Recipe = lazy(() => import('./pages/recipe/Recipe'));
const EditRecipe = lazy(() => import('./pages/recipe/EditRecipe'));
const Saved = lazy(() => import('./pages/Saved'));

function App() {
<<<<<<< HEAD
  const { authUser } = useAuthListener();
=======
  // Top Level provides all pages with authUser details
  // displayName, uid
  const { authUser } = useAuthUser();
>>>>>>> main

  return (
    <AuthContext.Provider value={{ authUser }}>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
<<<<<<< HEAD
            <Route path="/" element={<Welcome />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/profile/:uid" element={<Profile />} />
            <Route path="/editprofile/:uid" element={<EditProfile />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/recipe/:rid" element={<Recipe />} />
            <Route path="/editrecipe/:rid" element={<EditRecipe />} />
            <Route path="/saved" element={<Saved />} />
=======
            <Route path={ROUTES.WELCOME} element={<Welcome />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.LOG_IN} element={<Login />} />
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.UPLOAD} element={<Upload />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.RECIPE} element={<Recipe />} />
            <Route path={ROUTES.EDIT_RECIPE} element={<EditRecipe />} />
            <Route path={ROUTES.EDIT_PROFILE} element={<EditProfile />} />
            <Route path={ROUTES.EXPLORE} element={<Explore />} />
            <Route path={ROUTES.COMMENTS} element={<Comments />} />
>>>>>>> main
          </Routes>
        </Suspense>
      </Router>
    </AuthContext.Provider>

  );
}

export default App;
