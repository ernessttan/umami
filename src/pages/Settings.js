import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import FirebaseContext from '../context/FireBaseContext';
import PageHeader from '../components/Common/PageHeader';

function Settings() {
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext);
  const handleLogOut = () => {
    signOut(auth).then(() => {
      navigate('/');
    });
  };
  return (
    <div className="p-5">
      <PageHeader title="Settings" />
      <button type="button" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
}

export default Settings;
