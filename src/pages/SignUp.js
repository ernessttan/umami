import { useContext, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/buttons/BackButton';
import Input from '../components/forms/Input';
import { FirebaseContext } from '../context/firebase';
import { addNewUser } from '../firebase/functions';

function Signup() {
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext);
  const [signupInfo, setSignUpInfo] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setSignUpInfo((prevSignUpInfo) => ({
      ...prevSignUpInfo,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, signupInfo.email, signupInfo.password)
        .then(async (user) => {
          await updateProfile(user.user, {
            displayName: signupInfo.username,
          });
          // Add user to firestore
          await addNewUser(user.user);
        })
        .then(() => {
          navigate('/home');
        });
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('Email already in use, please try another one.');
      }
    }
  };

  return (
    <div className="container mx-auto max-w-lg p-8">
      <BackButton />
      <div className="px-2 mt-5">
        <h1>Create your account</h1>
        <div className="text-red-500">{errorMessage}</div>
        <form onSubmit={handleSignup} className="flex flex-col gap-5 mt-8">
          <label>
            Email
            <Input
              onChange={handleChange}
              className="placeholder:grey-500 bg-grey-100 w-full p-3 rounded-md"
              type="email"
              name="email"
              value={signupInfo.email}
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
              value={signupInfo.password}
            />
          </label>
          <label>
            Username
            <Input
              onChange={handleChange}
              className="placeholder:grey-500 bg-grey-100 w-full p-3 rounded-md"
              type="text"
              name="username"
              value={signupInfo.username}
              placeholder="thegreatestchefalive123"
            />
          </label>
          <div className="flex justify-end mt-8">
            <button type="submit" className="bg-orange-500 text-white p-3 px-10 rounded-full">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
