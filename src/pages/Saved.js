import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/Common/AppHeader';

function Saved() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <AppHeader />
      <div className="flex flex-col items-center justify-center mt-[30vh]">
        <h1 className="text-grey-500 font-bold">
          Work in Progress
        </h1>
        <button onClick={goBack} type="button" className="mt-5 text-orange-500 text-xl font-semibold">Go Back</button>
      </div>
    </>

  );
}

export default Saved;
