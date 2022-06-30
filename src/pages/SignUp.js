/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../components/Common/AuthHeader';
import SignUpForm from '../components/SignUp/SignUpForm';
import FireBaseContext from '../context/FireBaseContext';
import { getUserByUsername, setUserProfile } from '../firebase/services';
import * as ROUTES from '../constants/routes';

function SignUp() {
  const navigate = useNavigate();
  const { auth } = useContext(FireBaseContext);
  const [signUpInfo, setSignUpInfo] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle input change
  const handleChange = ((event) => {
    const { name, value } = event.target;
    setSignUpInfo((prevSignUpInfo) => ({
      ...prevSignUpInfo,
      [name]: value,
    }));
  });

  // Function to handle Sign Up completion
  const handleSignUp = async (event) => {
    event.preventDefault();
    await createUserWithEmailAndPassword(auth, signUpInfo.email, signUpInfo.password)
      .then(async (createdCredentials) => {
        // Signed up successfully
        const { user } = createdCredentials;
        // Update username
        await updateProfile(user, {
          displayName: signUpInfo.username,
        });
        await setUserProfile(user).then(navigate(ROUTES.FEED));
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('Sorry that email already exists');
        }
        setSignUpInfo({
          email: '',
          username: '',
          password: '',
        });
      });
  };

  return (
    <div className="container py-8 px-5">
      <AuthHeader />
      <SignUpForm
        errorMessage={errorMessage}
        handleSignUp={handleSignUp}
        handleChange={handleChange}
      />
    </div>
  );
}

export default SignUp;
