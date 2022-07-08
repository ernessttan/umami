import { TailSpin } from 'react-loader-spinner';

function Loader() {
  return (
    <div className="flex justify-center mt-20">
      <TailSpin height="100" width="100" color="#EC6C3A" />
    </div>

  );
}

export default Loader;
