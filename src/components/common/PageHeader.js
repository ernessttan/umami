import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function PageHeader({ title }) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center gap-5">
      <button onClick={goBack} type="button">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1>{title}</h1>
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
export default PageHeader;
