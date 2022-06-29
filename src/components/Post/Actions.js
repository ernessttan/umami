import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { toggleLike } from '../../firebase/services';

function Actions({
  totalComments, totalLikes, userLikedPost, id,
}) {
  const navigate = useNavigate();
  const { activeUser } = useContext(AuthContext);
  const [likes, setTotalLikes] = useState(totalLikes);
  const [likedStatus, setLikedStatus] = useState(userLikedPost);

  useEffect(() => {
    toggleLike(activeUser.uid, id, likedStatus);
  }, [likedStatus]);

  const routeToComments = () => {
    navigate(`/recipe/${id}/#${id}`);
  };

  const handleLiked = () => {
    setLikedStatus((prevLikedStatus) => !prevLikedStatus);
    setTotalLikes((prevTotalLikes) => (likedStatus ? prevTotalLikes - 1 : prevTotalLikes + 1));
  };

  return (
    <div className="flex gap-3 mt-3">
      <div className="flex flex-col items-center">
        <button onClick={handleLiked} type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${likedStatus ? 'fill-orange-100' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
        </button>
        <p>{likes}</p>
      </div>
      <div className="flex flex-col items-center">
        <button onClick={routeToComments} type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
        <p>{totalComments}</p>
      </div>
    </div>
  );
}

Actions.propTypes = {
  id: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  totalLikes: PropTypes.number.isRequired,
  userLikedPost: PropTypes.bool.isRequired,
};

export default Actions;
