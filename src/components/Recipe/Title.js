import PropTypes from 'prop-types';

function Title({ title }) {
  return (
    <h1 className="py-3">{title}</h1>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
