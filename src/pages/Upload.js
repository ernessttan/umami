import { useContext } from 'react';
import UploadHeader from '../components/Upload/UploadHeader';
import UploadForm from '../components/Upload/UploadForm';
import useUserProfile from '../hooks/useUserProfile';
import AuthContext from '../context/AuthContext';

function Upload() {
  const { activeUser } = useContext(AuthContext);
  const profile = useUserProfile(activeUser.displayName);
  return (
    <div>
      {profile && (
      <div className="container py-8 px-5">
        <UploadHeader />
        <UploadForm avatarUrl={profile.avatarUrl} id={profile.id} username={profile.username} />
      </div>
      )}
    </div>

  );
}

export default Upload;
