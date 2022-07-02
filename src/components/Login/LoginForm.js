import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

function LoginForm({
  handleLogin, errorMessage, setLoginInfo, loginInfo,
}) {
  // Function to handle input change
  const handleChange = ((event) => {
    const { name, value } = event.target;
    setLoginInfo((prevLoginInfo) => ({
      ...prevLoginInfo,
      [name]: value,
    }));
  });

  return (
    <div className="px-2">
      {errorMessage !== '' && <p className="text-red-500 py-3">{errorMessage}</p>}
      <h1 className="mb-5">Log In</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <div>
          <h2>Email</h2>
          <input
            onChange={handleChange}
            type="text"
            name="email"
            value={loginInfo.email}
            placeholder="gordonramsay@hellskitchen.com"
            className="input-grey"
          />
        </div>
        <div>
          <h2>Password</h2>
          <input
            onChange={handleChange}
            type="text"
            name="password"
            value={loginInfo.password}
            className="input-grey"
          />
        </div>
        <p className="text-sm">
          Dont Have an Account?
          <Link to={ROUTES.SIGN_UP} className="text-orange-500 font-semibold ml-1">
            Sign Up
          </Link>
        </p>
        <div className="flex justify-end mt-5">
          <button type="submit" className="rounded-full bg-orange-500 text-white py-3 px-10">Log In</button>
        </div>
      </form>
    </div>
  );
}

LoginForm.defaultProps = {
  errorMessage: '',
};

LoginForm.propTypes = {
  loginInfo: PropTypes.objectOf(PropTypes.string).isRequired,
  setLoginInfo: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default LoginForm;
