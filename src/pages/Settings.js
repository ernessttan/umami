import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import FirebaseContext from '../context/FireBaseContext';

function Settings() {
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext);
  const handleLogOut = () => {
    signOut(auth).then(() => {
      console.log('Logged Out');
      navigate('/');
    });
  };
  return (
    <div>
      <button type="button" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
}

export default Settings;
