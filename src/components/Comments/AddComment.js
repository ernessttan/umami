import generateUniqueId from 'generate-unique-id';
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import UserProfileContext from '../../context/UserProfileContext';
import { addComment } from '../../firebase/services';

function AddComment({ recipeId, setAllComments, comments }) {
  const { profile: { avatarUrl, username } } = useContext(UserProfileContext);
  const [comment, setComment] = useState({
    id: generateUniqueId(3),
    content: '',
    username: `${username}`,
    avatarUrl: `${avatarUrl}`,
    dateCreated: Date.now(),
  });

  const handleChange = (event) => {
    setComment((prevComment) => ({
      ...prevComment,
      content: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAllComments([comment, ...comments]);
    await addComment(comment, recipeId)
      .then(() => {
        setComment({
          id: generateUniqueId(3),
          content: '',
          username: `${username}`,
          avatarUrl: `${avatarUrl}`,
          dateCreated: Date.now(),
        });
      });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bottom-5 absolute bg-textbox-grey rounded flex items-center gap-2 p-3">
      <img src={avatarUrl} className="h-8 w-8" alt="user avatar" />
      <input type="text" name="content" value={comment.content} onChange={handleChange} className="bg-transparent grow" />
      <button className="text-orange-500" type="submit">Send</button>
    </form>
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
