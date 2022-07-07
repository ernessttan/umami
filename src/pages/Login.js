import BackButton from '../components/common/BackButton';
import LoginForm from '../components/Login/LoginForm';

function Login() {
  return (
    <div className="container mx-auto max-w-screen-md py-5 px-3">
      <BackButton />
      <LoginForm />
    </div>
  );
}

export default Login;
