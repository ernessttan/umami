import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import * as ROUTES from './constants/routes';
import AuthContextProvider from './context/AuthContextProvider';

const Welcome = lazy(() => import('./pages/Welcome'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const Upload = lazy(() => import('./pages/Upload'));

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Suspense fallback={<div>Loading</div>}>
          <Routes>
            <Route path={ROUTES.WELCOME} element={<Welcome />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.LOG_IN} element={<Login />} />
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.UPLOAD} element={<Upload />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthContextProvider>

  );
}

export default App;
