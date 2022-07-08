import PropTypes from 'prop-types';
import { DotsHorizontalIcon, TrashIcon, PencilIcon } from '@heroicons/react/solid';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { deleteRecipe } from '../../firebase/services';

function Title({ title, username, recipeId }) {
  const [toggleDrop, setToggleDrop] = useState(false);
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext);

  const toggleDropDown = (event) => {
    event.preventDefault();
    setToggleDrop((prevToggleDrop) => !prevToggleDrop);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    await deleteRecipe(recipeId)
      .then(() => {
        navigate(-1);
      });
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="py-3">{title}</h1>
      {authUser.displayName === username ? (
        <div>
          <button type="button" onClick={toggleDropDown}>
            <DotsHorizontalIcon className="h-5 w-5 text-grey-700" />
          </button>
          <div className={`${toggleDrop ? 'block' : 'hidden'} rounded bg-white z-50 p-5 shadow absolute`} id="dropdown">
            <button type="button" className="flex items-center gap-2">
              <PencilIcon className="h-5 w-5 text-grey-700" />
              <p>Edit</p>
            </button>
            <button onClick={handleDelete} type="button" className="flex items-center gap-2">
              <TrashIcon className="h-5 w-5 text-red-500" />
              <p>Delete</p>
            </button>
          </div>
        </div>
      ) : null}
      {/* Dropdown menu */}
    </div>
  );
}

Title.propTypes = {
  recipeId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default Title;
