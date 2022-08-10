import BarLoader from 'react-spinners/BarLoader';

const override = {
  width: '100%',
  height: '6px',
};

function Loader() {
  return (
    <BarLoader color="#EC6C3A" loading cssOverride={override} />
  );
}

export default Loader;
