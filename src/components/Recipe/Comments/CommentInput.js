/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import generateUniqueId from 'generate-unique-id';
import { addComment } from '../../../firebase/services';
import AuthContext from '../../../context/AuthContext';
import useUserProfile from '../../../hooks/useUserProfile';

function CommentInput({ recipeId, setAllComments, comments }) {
  const { activeUser } = useContext(AuthContext);
  const profile = useUserProfile(activeUser.displayName);
  const [comment, setComment] = useState({
    comment: '',
    avatarUrl: '',
    username: '',
    id: '',
    dateCreated: '',
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setComment((prevComment) => ({
      ...prevComment,
      [name]: value,
      avatarUrl: `${profile.avatarUrl}`,
      username: `${profile.username}`,
      id: generateUniqueId({ length: 2, useLetters: false }),
      dateCreated: Date.now(),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setComment({
      comment: '',
      avatarUrl: '',
      username: '',
      id: '',
      dateCreated: '',
    });
    setAllComments([comment, ...comments]);
    await addComment(comment, recipeId);
  };

  return (
    <div className="border py-5 pl-5 pr-5 shadow sticky bottom-0 w-full">
      {profile && (
        <form onSubmit={handleSubmit} className="flex items-center bg-textbox-grey py-3 px-4 rounded">
          <img className="rounded-full h-8 w-8" src={profile.avatarUrl} alt="user avatar" />
          <input
            onChange={handleChange}
            className="border-none bg-transparent grow focus:ring-0"
            type="text"
            name="comment"
            value={comment.comment}
            placeholder="Add a comment..."
          />
          <button className="text-orange-500" type="submit">Send</button>
        </form>
      )}

    </div>
  );
}

CommentInput.defaultProps = {
  comments: [],
};

CommentInput.propTypes = {
  recipeId: PropTypes.string.isRequired,
  setAllComments: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object),
};

export default CommentInput;
