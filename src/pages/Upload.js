import { useContext } from 'react';
import UploadHeader from '../components/Upload/UploadHeader';
import UploadForm from '../components/Upload/UploadForm';
import AuthContext from '../context/AuthContext';

function Upload() {
  const { activeUser } = useContext(AuthContext);
  return (
    <div className="container mx-auto max-w-screen-md py-8 px-5">
      <UploadHeader />
      <UploadForm
        avatarUrl={activeUser.photoUrl}
        id={activeUser.uid}
        username={activeUser.displayName}
      />
    </div>
  );
}

export default Upload;
