import PropTypes from 'prop-types';
import format from 'date-fns/format';

function Information({
  username, dateCreated, difficulty, prepTime, cookTime,
}) {
  return (
    <div className="py-5 flex flex-col gap-3">
      <div>
        <h2>
          <span className="mr-1 font-normal">By</span>
          {username}
        </h2>
        <p className="text-grey-700 text-sm">{format(dateCreated, 'MMMM dd, yyy')}</p>
      </div>
      <p className="font-semibold text-grey-700">
        Difficulty:
        {' '}
        {difficulty}
      </p>
      <div className="flex gap-3 font-semibold text-grey-700">
        <p>
          Prep:
          {' '}
          {prepTime}
          m
        </p>
        <p>
          Cook:
          {' '}
          {cookTime}
          m
        </p>
      </div>
    </div>
  );
}

Information.propTypes = {
  username: PropTypes.string.isRequired,
  dateCreated: PropTypes.number.isRequired,
  difficulty: PropTypes.string.isRequired,
  prepTime: PropTypes.string.isRequired,
  cookTime: PropTypes.string.isRequired,
};

export default Information;
