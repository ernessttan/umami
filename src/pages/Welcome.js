import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="container mx-auto max-w-lg p-8 mt-36">
      <img src="logo.svg" alt="umami logo" />
      <h1 className="text-3xl my-5">
        Your one stop shop
        for all things food.
      </h1>
      <div className="flex flex-col gap-3 mt-10">
        <Link to="/signup" className="flex items-center justify-center w-full text-orange-500 border border-orange-100 rounded-full p-2 hover:text-white hover:bg-orange-500">
          Sign Up
        </Link>
        <Link to="/login" className="flex items-center justify-center w-full text-orange-500 border border-orange-100 rounded-full p-2 hover:text-white hover:bg-orange-500">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
