import UploadHeader from '../components/Upload/UploadHeader';
import UploadForm from '../components/Upload/UploadForm';
import useUserProfile from '../hooks/useUserProfile';

function Upload() {
  const { avatarUrl } = useUserProfile();

  return (
    <div className="container py-8 px-5">
      <UploadHeader />
      <UploadForm avatarUrl={avatarUrl} />
    </div>
  );
}

export default Upload;
