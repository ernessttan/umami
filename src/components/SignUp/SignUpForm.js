import { Link } from 'react-router-dom';

function SignUpForm() {
  return (
    <div className="px-2">
      <h1 className="mb-5">Create your account.</h1>
      <form className="flex flex-col gap-5">
        <div>
          <h2>Email</h2>
          <input type="text" name="email" placeholder="gordonramsay@hellskitchen.com" className="rounded w-full bg-textbox-grey p-2" />
        </div>
        <div>
          <h2>Username</h2>
          <input type="text" name="username" placeholder="thegreatestchefalive123" className="rounded w-full bg-textbox-grey p-2" />
        </div>
        <div>
          <h2>Password</h2>
          <input type="text" name="password" className="rounded w-full bg-textbox-grey p-2" />
        </div>
        <div className="flex justify-end mt-16">
          <Link to="/" className="rounded-full bg-orange-500 text-white py-3 px-10">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
