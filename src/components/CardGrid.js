import PropTypes from 'prop-types';

function CardGrid({ children, className }) {
  return (
    <div className={`grid grid-cols-2 gap-5 md:grid-cols-3 ${className}`}>
      {children}
    </div>
  );
}

CardGrid.defaultProps = {
  className: '',
};

CardGrid.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default CardGrid;
