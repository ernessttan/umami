import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import FirebaseContext from '../context/FireBaseContext';
import PageHeader from '../components/common/PageHeader';

function Settings() {
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext);
  const handleLogOut = () => {
    signOut(auth).then(() => {
      navigate('/');
    });
  };
  return (
    <div className="container mx-auto max-w-screen-md h-screen py-10 px-10">
      <PageHeader title="Settings" />
      <button className="mt-10" type="button" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
}

export default Settings;
