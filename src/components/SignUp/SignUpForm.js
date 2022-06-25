import PropTypes from 'prop-types';

function SignUpForm({ handleChange, handleSignUp, errorMessage }) {
  return (
    <div className="px-2">
      {errorMessage !== '' && <p className="text-red-500 py-3">{errorMessage}</p>}
      <h1 className="mb-5">Create your account.</h1>
      <form onSubmit={handleSignUp} className="flex flex-col gap-5">
        <div>
          <h2>Email</h2>
          <input
            onChange={handleChange}
            type="text"
            name="email"
            placeholder="gordonramsay@hellskitchen.com"
            className="rounded w-full bg-textbox-grey p-2"
          />
        </div>
        <div>
          <h2>Username</h2>
          <input
            onChange={handleChange}
            type="text"
            name="username"
            placeholder="thegreatestchefalive123"
            className="rounded w-full bg-textbox-grey p-2"
          />
        </div>
        <div>
          <h2>Password</h2>
          <input
            onChange={handleChange}
            type="text"
            name="password"
            className="rounded w-full bg-textbox-grey p-2"
          />
        </div>
        <div className="flex justify-end mt-16">
          <button type="submit" className="rounded-full bg-orange-500 text-white py-3 px-10">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

SignUpForm.defaultProps = {
  errorMessage: '',
};

SignUpForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default SignUpForm;
