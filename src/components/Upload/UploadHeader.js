import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

function UploadHeader() {
  return (
    <div className="flex items-center">
      <Link to={ROUTES.FEED}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </Link>
    </div>
  );
}

export default UploadHeader;
