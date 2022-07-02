import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { signOut } from 'firebase/auth';
import FirebaseContext from '../../context/FireBaseContext';

function ProfileHeader() {
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext);

  const handleLogOut = () => {
    signOut(auth).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="mb-5 ml-1 px-5 py-5 flex justify-end">
      <button className="text-orange-500" type="button" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
}

export default ProfileHeader;
