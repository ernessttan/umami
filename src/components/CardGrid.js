import PropTypes from 'prop-types';

function CardGrid({ className, children }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

CardGrid.defaultProps = {
  className: '',
  children: null,
};

CardGrid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default CardGrid;
