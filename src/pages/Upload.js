/* eslint-disable react/jsx-no-constructed-context-values */
import { useContext } from 'react';
import BackButton from '../components/common/BackButton';
import UploadForm from '../components/Upload/Upload';
import AuthContext from '../context/AuthContext';
import useUser from '../hooks/useUser';

function Upload() {
  const { authUser } = useContext(AuthContext);
  const { profile } = useUser(authUser.uid);

  return profile ? (
    <div className="p-5">
      <BackButton />
      <UploadForm
        avatarUrl={profile.avatarUrl}
        username={authUser.displayName}
        id={authUser.uid}
      />
    </div>
  ) : null;
}

export default Upload;
