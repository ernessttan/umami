import PropTypes from 'prop-types';
import formatDistance from 'date-fns/formatDistance';

function Information({ title, dateCreated }) {
  return (
    <>
      <h3>{title}</h3>
      <p>
        {formatDistance(dateCreated, new Date())}
        {' '}
        ago
      </p>
    </>
  );
}

Information.propTypes = {
  title: PropTypes.string.isRequired,
  dateCreated: PropTypes.number.isRequired,
};

export default Information;
