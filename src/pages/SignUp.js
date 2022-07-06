import BackButton from '../components/common/BackButton';
import SignUpForm from '../components/SignUp/SignUp';

function SignUp() {
  return (
    <div className="container mx-auto max-w-screen-md py-5 px-3">
      <BackButton />
      <SignUpForm />
    </div>
  );
}

export default SignUp;
