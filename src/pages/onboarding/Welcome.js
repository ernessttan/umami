import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useContext, useState } from 'react';
import { FirebaseContext } from '../../context/firebase';

function Welcome() {
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, 'guest@gmail.com', 'guest123')
        .then(() => {
          navigate('/home');
        });
    } catch (error) {
      setErrorMessage('There was a problem logging in. Please try again.');
    }
  };

  return (
    <div className="container mx-auto max-w-lg p-8 mt-36">
      <img src="logo.svg" alt="umami logo" />
      <h1 className="text-3xl my-5">
        Your one stop shop
        for all things food.
      </h1>
      <div className="text-red-500">{errorMessage}</div>
      <div className="flex flex-col gap-3 mt-10">
        <Link to="/signup" className="flex items-center justify-center w-full text-orange-500 border border-orange-100 rounded-full p-2 hover:text-white hover:bg-orange-500">
          Sign Up
        </Link>
        <Link to="/login" className="flex items-center justify-center w-full text-orange-500 border border-orange-100 rounded-full p-2 hover:text-white hover:bg-orange-500">
          Login
        </Link>
        <button onClick={handleLogin} type="button" className="flex items-center justify-center w-full text-orange-500 border border-orange-100 rounded-full p-2 hover:text-white hover:bg-orange-500">
          Take a look inside
        </button>
      </div>
    </div>
  );
}

export default Welcome;
