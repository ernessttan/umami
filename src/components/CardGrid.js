import PropTypes from 'prop-types';

function CardGrid({ children }) {
  return (
    <div className="px-3 grid grid-cols-2 gap-5 md:grid-cols-3">
      {children}
    </div>
  );
}

CardGrid.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardGrid;
