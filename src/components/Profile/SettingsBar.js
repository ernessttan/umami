import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FirebaseContext from '../../context/FireBaseContext';

function SettingsBar() {
  const { auth } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="flex justify-end px-5">
      <button onClick={handleLogOut} type="button" className="text-orange-500">Logout</button>
    </div>
  );
}

export default SettingsBar;
