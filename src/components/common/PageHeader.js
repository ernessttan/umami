import PropTypes from 'prop-types';
import BackButton from './BackButton';

function PageHeader({ title }) {
  return (
    <div className="flex items-center gap-5">
      <BackButton />
      <h1>{title}</h1>
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
export default PageHeader;
