/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import FirebaseContext from '../../context/FireBaseContext';
import addNewUser from '../../firebase/services';
import * as ROUTES from '../../constants/routes';

function SignUpForm() {
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext);
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onTouched',
  });
  const [errorMessage, setErrorMessage] = useState();

  const handleSignUp = async (data) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        // Extract user object from credentials
        const { user } = userCredential;
        // Update user object with username
        await updateProfile(user, {
          displayName: data.username,
        });
        // Add user to db/users
        await addNewUser(user)
          .then(navigate(ROUTES.HOME));
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('Sorry that email already exists');
        }
      });
  };

  //   TODO: Change to type="password" when have forgot password implemented
  return (
    <div className="mt-20 px-3">
      {errorMessage !== '' && <p className="text-red-500 py-3">{errorMessage}</p>}
      <h1 className="mb-5">Create your account.</h1>
      <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-5">
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            className="input-grey"
            {...register('email', { required: true })}
          />
          {errors.email && <p>Please provide an email</p>}
        </label>
        <label htmlFor="password">
          Password
          <input
            type="text"
            name="password"
            className="input-grey"
            {...register('password', { required: true })}
          />
          {errors.password && <p>Please provide a password</p>}
        </label>
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            className="input-grey"
            {...register('username', { required: true })}
          />
          {errors.username && <p>Please provide  username</p>}
        </label>
        <div className="flex justify-end mt-16">
          <button
            type="submit"
            className={`${isValid ? 'bg-orange-500' : 'bg-grey-500'} rounded-full text-white py-3 px-10`}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
