/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import generateUniqueId from 'generate-unique-id';
import { addComment } from '../../../firebase/services';
import AuthContext from '../../../context/AuthContext';
import useUserProfile from '../../../hooks/useUserProfile';
import FirebaseContext from '../../../context/FireBaseContext';

function AddComment({
  recipeId, setAllComments, comments,
}) {
  const { db } = useContext(FirebaseContext);
  const { activeUser } = useContext(AuthContext);
  const profile = useUserProfile(activeUser.displayName);
  console.log(profile);
  const [newComment, setNewComment] = useState({
    content: '',
    dateCreated: Date.now(),
    username: '',
    avatarUrl: `${profile.avatarUrl}`,
  });

  console.log(newComment);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  return (
    <div className="border py-5 pl-5 pr-5 shadow sticky bottom-0 w-full">
      {profile && (
        <form className="flex items-center bg-textbox-grey py-3 px-4 rounded">
          <img className="rounded-full h-8 w-8" src={profile.avatarUrl} alt="user avatar" />
          <input
            onChange={handleChange}
            className="border-none bg-transparent grow focus:ring-0"
            type="text"
            name="content"
            placeholder="Add a comment..."
          />
          <button className="text-orange-500" type="submit">Send</button>
        </form>
      )}

    </div>
  );
}

AddComment.defaultProps = {
  comments: [],
};

AddComment.propTypes = {
  recipeId: PropTypes.string.isRequired,
  setAllComments: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object),
};

export default AddComment;
