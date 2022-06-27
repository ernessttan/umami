import UploadHeader from '../components/Upload/UploadHeader';
import UploadForm from '../components/Upload/UploadForm';
import useUserProfile from '../hooks/useUserProfile';

function Upload() {
  const profile = useUserProfile();
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
