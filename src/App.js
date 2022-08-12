import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
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
const Explore = lazy(() => import('./pages/Explore'));
const Recipe = lazy(() => import('./pages/recipe/Recipe'));
const EditRecipe = lazy(() => import('./pages/recipe/EditRecipe'));
const Saved = lazy(() => import('./pages/Saved'));

function App() {
  const { authUser } = useAuthListener();

  return (
    <AuthContext.Provider value={{ authUser }}>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
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
          </Routes>
        </Suspense>
      </Router>
    </AuthContext.Provider>

  );
}

export default App;