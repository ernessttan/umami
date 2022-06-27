import PropTypes from 'prop-types';

function Servings({ servings }) {
  return (
    <div className="flex items-center">
      <p className="font-semibold text-grey-700 mr-3">Servings:</p>
      <input className="bg-textbox-grey rounded w-8 p-3 py-1" placeholder={servings} />
    </div>
  );
}

Servings.propTypes = {
  servings: PropTypes.string.isRequired,
};

export default Servings;
