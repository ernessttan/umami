/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import { useState } from 'react';
import PropTypes from 'prop-types';
import Description from './Description';
import Comments from '../Common/Comments/Comments';

function Social({
  avatarUrl, username, description, id, comments,
}) {
  const [selected, setSelected] = useState('description');

  const handleClick = (event) => {
    const { value } = event.target;
    setSelected(value);
  };

  return (
    <div className="mt-5 py-5">
      <div className="flex items-center gap-5 ">
        <button
          onClick={handleClick}
          type="button"
          value="description"
          className={`text-lg ${selected === 'description' ? 'border-b-4 border-orange-500 font-semibold' : ''}`}
        >
          Description
        </button>
        <button
          onClick={handleClick}
          type="button"
          value="comments"
          className={`text-lg ${selected === 'comments' ? 'border-b-4 border-orange-500 font-semibold' : ''}`}
        >
          Comments
        </button>
      </div>
      <div className="border -ml-7 w-screen" />
      <div>
        {selected === 'description' ? <Description avatarUrl={avatarUrl} username={username} description={description} /> : null}
        {selected === 'comments' ? <Comments comments={comments} avatarUrl={avatarUrl} /> : null}
      </div>
    </div>
  );
}

Social.defaultProps = {
  avatarUrl: '/icons/profile.svg',
  comments: [],
};

Social.propTypes = {
  avatarUrl: PropTypes.string,
  username: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object),
};

export default Social;
