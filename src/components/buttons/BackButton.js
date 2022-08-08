import { ChevronLeftIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button className="h-10 w-10" onClick={handleClick} type="button">
      <ChevronLeftIcon />
    </button>
  );
}

export default BackButton;
