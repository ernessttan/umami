import PropTypes from 'prop-types';

function Statistics({ totalFollowers, totalFollowing, totalPosts }) {
  return (
    <div className="flex items-center gap-5 mt-2 pl-3">
      <h3 className="font-bold">
        {totalPosts}
        {' '}
        <span className="font-normal">Posts</span>
      </h3>
      <h3 className="font-bold">
        {totalFollowers}
        {' '}
        <span className="font-normal">Followers</span>
      </h3>
      <h3 className="font-bold">
        {totalFollowing}
        {' '}
        <span className="font-normal">Following</span>
      </h3>
    </div>
  );
}

Statistics.propTypes = {
  totalFollowers: PropTypes.number.isRequired,
  totalFollowing: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
};

export default Statistics;
