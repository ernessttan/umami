import PropTypes from 'prop-types';

function LoginForm({ handleChange, handleLogin, errorMessage }) {
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
            className="input-grey"
          />
        </div>
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
  handleChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default LoginForm;
