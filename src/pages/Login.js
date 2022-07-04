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

  // Function to handle Login
  const handleLogin = async (event) => {
    event.preventDefault();
    await signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
      .then(() => {
        navigate(ROUTES.FEED);
      })
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
    <div className="container mx-auto max-w-screen-md h-screen mt-20">
      <div className="w-full px-5">
        <AuthHeader />
        <div>
          <LoginForm
            loginInfo={loginInfo}
            setLoginInfo={setLoginInfo}
            errorMessage={errorMessage}
            handleLogin={handleLogin}
          />
        </div>
      </div>

    </div>
  );
}

export default Login;
