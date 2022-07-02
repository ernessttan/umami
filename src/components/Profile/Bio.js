import PropTypes from 'prop-types';

function Bio({ bio }) {
  return (
    <p className="py-3 pl-3">{bio}</p>
  );
}

Bio.defaultProps = {
  bio: '',
};

Bio.propTypes = {
  bio: PropTypes.string,
};

export default Bio;
