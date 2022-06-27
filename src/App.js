import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import * as ROUTES from './constants/routes';
import AuthContextProvider from './context/AuthContextProvider';

const Welcome = lazy(() => import('./pages/Welcome'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Login = lazy(() => import('./pages/Login'));
const Feed = lazy(() => import('./pages/Feed'));
const Upload = lazy(() => import('./pages/Upload'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path={ROUTES.WELCOME} element={<Welcome />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.LOG_IN} element={<Login />} />
            <Route path={ROUTES.FEED} element={<Feed />} />
            <Route path={ROUTES.UPLOAD} element={<Upload />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
