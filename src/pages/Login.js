/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AuthHeader from '../components/common/AuthHeader';
import LoginForm from '../components/Login/LoginForm';
import FirebaseContext from '../context/FireBaseContext';
import * as ROUTES from '../constants/routes';

function Login() {
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle input change
  const handleChange = ((event) => {
    const { name, value } = event.target;
    setLoginInfo((prevLoginInfo) => ({
      ...prevLoginInfo,
      [name]: value,
    }));
  });

  // Function to handle Login
  const handleLogin = async (event) => {
    event.preventDefault();
    await signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
      .then(() => navigate(ROUTES.FEED))
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          setErrorMessage('Sorry that user does not exist');
        }
        setLoginInfo({
          email: '',
          password: '',
        });
      });
  };

  return (
    <div className="container py-8 px-5">
      <AuthHeader />
      <LoginForm
        errorMessage={errorMessage}
        handleChange={handleChange}
        handleLogin={handleLogin}
      />
    </div>
  );
}

export default Login;
