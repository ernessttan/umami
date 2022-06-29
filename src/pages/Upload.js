import { useContext } from 'react';
import UploadHeader from '../components/Upload/UploadHeader';
import UploadForm from '../components/Upload/UploadForm';
import AuthContext from '../context/AuthContext';

function Upload() {
  const { activeUser } = useContext(AuthContext);
  return (
    <div>

      <div className="container py-8 px-5">
        <UploadHeader />
        <UploadForm
          avatarUrl={activeUser.avatarUrl}
          id={activeUser.id}
          username={activeUser.username}
        />
      </div>

    </div>

  );
}

export default Upload;
