import { ChevronLeftIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  return (
    <button onClick={useNavigate(-1)} type="button">
      <ChevronLeftIcon className="h-8 w-8" />
    </button>

  );
}

export default BackButton;
