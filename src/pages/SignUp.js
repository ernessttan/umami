/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../components/Common/AuthHeader';
import SignUpForm from '../components/SignUp/SignUpForm';
import FireBaseContext from '../context/FireBaseContext';
import { addNewUser } from '../firebase/services';
import * as ROUTES from '../constants/routes';

function SignUp() {
  const navigate = useNavigate();
  const { auth } = useContext(FireBaseContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [signUpInfo, setSignUpInfo] = useState({
    email: '',
    username: '',
    password: '',
  });

  // Function to handle Sign Up completion
  const handleSignUp = async (event) => {
    event.preventDefault();
    await createUserWithEmailAndPassword(auth, signUpInfo.email, signUpInfo.password)
      .then(async (createdCredentials) => {
        // Signed up successfully
        const { user } = createdCredentials;
        // Update username in Firebase Auth
        await updateProfile(user, {
          displayName: signUpInfo.username,
        });
        // Add new user to db
        await addNewUser(user).then(navigate(ROUTES.FEED));
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('Sorry that email already exists');
        }
      });
  };

  return (
    <div className="container py-8 px-5">
      <AuthHeader />
      <SignUpForm
        signUpInfo={signUpInfo}
        setSignUpInfo={setSignUpInfo}
        errorMessage={errorMessage}
        handleSignUp={handleSignUp}
      />
    </div>
  );
}

export default SignUp;
