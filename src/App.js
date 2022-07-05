import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import * as ROUTES from './constants/routes';

const Welcome = lazy(() => import('./pages/Welcome'));
const SignUp = lazy(() => import('./pages/SignUp'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path={ROUTES.WELCOME} element={<Welcome />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
