import { ChevronLeftIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} type="button">
      <ChevronLeftIcon className="h-6 w-6" />
    </button>
  );
}

export default BackButton;
