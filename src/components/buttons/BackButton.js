import { ChevronLeftIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button className="h-6 w-6" onClick={handleClick} type="button">
      <ChevronLeftIcon />
    </button>
  );
}

export default BackButton;
