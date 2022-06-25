import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import * as ROUTES from './constants/routes';
import AuthContextProvider from './context/AuthContextProvider';

const Welcome = lazy(() => import('./pages/Welcome'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Login = lazy(() => import('./pages/Login'));

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path={ROUTES.WELCOME} element={<Welcome />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.LOG_IN} element={<Login />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthContextProvider>

  );
}

export default App;
