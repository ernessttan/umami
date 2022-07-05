/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import FirebaseContext from '../../context/FireBaseContext';
import * as ROUTES from '../../constants/routes';

function LoginForm() {
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (data) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(navigate(ROUTES.HOME))
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          setErrorMessage('Sorry that user does not exist');
        }
      });
  };

  return (
    <div className="mt-20 px-3">
      {errorMessage !== '' && <p className="text-red-500 py-3">{errorMessage}</p>}
      <h1 className="mb-5">Login</h1>
      <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-5">
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
        <div className="flex justify-end mt-16">
          <button
            type="submit"
            className="bg-orange-500 rounded-full text-white py-3 px-10"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
