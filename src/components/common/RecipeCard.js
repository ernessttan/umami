/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';

function ProfilePost({
  id, imageUrl, title, totalLikes,
}) {
  return (
    <div>
      <img className="object-cover rounded w-40 h-40" src={imageUrl} alt="user post" />
      <h2 className="py-1 font-bold text-xl">{title}</h2>
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
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
        <p className="text-sm">{totalLikes}</p>
      </div>
    </div>
  );
}
ProfilePost.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
};

export default ProfilePost;
