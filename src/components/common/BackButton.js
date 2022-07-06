import { ChevronLeftIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} type="button">
      <ChevronLeftIcon className="h-8 w-8" />
    </button>

  );
}

export default BackButton;
