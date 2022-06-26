import PropTypes from 'prop-types';

function Information({ title, dateCreated }) {
  return (
    <div className="pl-5">
      <h3 className="text-lg font-semibold mt-3">{title}</h3>
      <p>{dateCreated}</p>
    </div>
  );
}

Information.propTypes = {
  title: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
};

export default Information;
