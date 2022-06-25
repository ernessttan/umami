import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

function Welcome() {
  return (
    <div className="container mx-auto px-8 mt-60">
      <img src="logo.svg" alt="brand logo" />
      <h1 className="text-3xl my-5">
        Your one stop shop for all things food.
      </h1>
      <div className="flex flex-col gap-4 mt-20">
        <Link to={ROUTES.SIGN_UP} className="bg-orange-500 text-white rounded-full flex justify-center py-2">Sign Up</Link>
        <Link to={ROUTES.LOGIN} className="border border-orange-500 text-orange-500 rounded-full flex justify-center py-2">Login</Link>
      </div>
    </div>
  );
}

export default Welcome;
