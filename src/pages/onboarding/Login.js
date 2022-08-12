import { useState, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../context/firebase';
import Input from '../../components/forms/Input';
import BackButton from '../../components/buttons/BackButton';

function Login() {
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setLoginInfo((prevLoginInfo) => ({
      ...prevLoginInfo,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
        .then(() => {
          navigate('/home');
        });
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setErrorMessage('User not found, please try again.');
      } else if (error.code === 'auth/wrong-password') {
        setErrorMessage('Wrong password, please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto max-w-lg p-8">
      <BackButton />
      <div className="px-2 mt-5">
        <h1>Login</h1>
        <div className="text-red-500">{errorMessage}</div>
        <form onSubmit={handleLogin} className="flex flex-col gap-5 mt-8">
          <label>
            Email
            <Input
              onChange={handleChange}
              className="placeholder:grey-500 bg-grey-100 w-full p-3 rounded-md"
              type="email"
              name="email"
              value={loginInfo.email}
              placeholder="gordonramsay@hellskitchen.com"
            />
          </label>
          <label>
            Password
            <Input
              onChange={handleChange}
              className="placeholder:grey-500 bg-grey-100 w-full p-3 rounded-md"
              type="password"
              name="password"
              value={loginInfo.password}
            />
          </label>
          <div className="flex justify-end mt-8">
            <button type="submit" className="bg-orange-500 text-white p-3 px-10 rounded-full">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
