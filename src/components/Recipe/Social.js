/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import { useState } from 'react';
import PropTypes from 'prop-types';
import Description from './Description';

function Social({
  avatarUrl, username, description,
}) {
  const [selected, setSelected] = useState('description');

  const handleClick = (event) => {
    const { value } = event.target;
    setSelected(value);
  };

  return (
    <div className="mt-5">
      <div className="flex items-center gap-5 px-5">
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
      <Description avatarUrl={avatarUrl} username={username} description={description} />
    </div>
  );
}

Social.defaultProps = {
  avatarUrl: '/icons/profile.svg',
  description: '',
  username: '',
};

Social.propTypes = {
  avatarUrl: PropTypes.string,
  username: PropTypes.string,
  description: PropTypes.string,
};

export default Social;
