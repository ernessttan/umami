import { ChevronLeftIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  return (
    <div className="py-3">
      <button onClick={() => navigate(-1)} type="button">
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
    </div>
  );
}

export default BackButton;
