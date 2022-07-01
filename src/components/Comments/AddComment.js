/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import generateUniqueId from 'generate-unique-id';
import AuthContext from '../../context/AuthContext';
import { addComment } from '../../firebase/services';

function AddComment({
  recipeId, setAllComments, comments,
}) {
  const { activeUser } = useContext(AuthContext);
  const [newComment, setNewComment] = useState({
    content: '',
    dateCreated: Date.now(),
    username: `${activeUser.displayName}`,
    avatarUrl: `${activeUser.photoUrl}`,
    id: generateUniqueId({ length: 2, useLetters: false }),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewComment((prevComment) => ({
      ...prevComment,
      [name]: value,
      id: generateUniqueId({ length: 2, useLetters: false }),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add comment to db
    await addComment(newComment, recipeId);
    // Set all comments state with new comment
    setAllComments([newComment, ...comments]);
    setNewComment((prevComment) => ({
      ...prevComment,
      content: '',
    }));
  };

  return (
    <div className="border py-5 pl-5 pr-5 shadow fixed bottom-0 w-full h-auto">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-textbox-grey py-3 px-4 rounded">
        <img className="rounded-full h-8 w-8" src={activeUser.avatarUrl} alt="user avatar" />
        <input
          onChange={handleChange}
          className="border-none bg-transparent grow focus:ring-0"
          type="text"
          name="content"
          value={newComment.content}
          placeholder="Add a comment..."
        />
        <button className="text-orange-500" type="submit">Send</button>
      </form>
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
