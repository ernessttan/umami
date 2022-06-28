/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';

function Comments({ comments, avatarUrl }) {
  return (
    <div>
      <div>
        <div className="flex items-center">
          <img src="/icons/profile.svg" alt="user avatar" />
          <p>anniecooks123</p>
        </div>
        <p>
          This chicken was good but I think calling it healthy is a stretch.
          So much sugar in the sauce!!!
        </p>
      </div>

      <div className="-ml-7 w-screen">
        <div className="shadow bg-navbar-fill">
          <div className="absolute sticky bottom-0 flex items-center bg-textbox-grey rounded py-3 px-4 mx-3">
            <img className="object-cover w-8 h-8 rounded-full" src={avatarUrl} alt="user avatar" />
            <input className="border-none bg-transparent" type="text" placeholder="Add a comment..." />
          </div>
        </div>
      </div>
    </div>
  );
}

Comments.defaultProps = {
  comments: [],
  avatarUrl: '/icons/profile.svg',
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  avatarUrl: PropTypes.string,
};

export default Comments;
