import PropTypes from 'prop-types';
import { DotsHorizontalIcon, TrashIcon, PencilIcon } from '@heroicons/react/solid';
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
    <>
      <h1 className="py-3">{title}</h1>
      {authUser.displayName === username ? (
        <div className="flex flex-col">
          <button className="flex justify-end" type="button" onClick={toggleDropDown}>
            <DotsHorizontalIcon className="h-5 w-5 text-grey-700" />
          </button>
          <div className="relative">
            <div className={`${toggleDrop ? 'block' : 'hidden'} flex flex-col gap-2 rounded bg-white p-5 shadow absolute right-1`}>
              <Link to={`/editrecipe/${recipeId}`} className="flex items-center gap-2">
                <PencilIcon className="h-5 w-5 text-grey-700" />
                <p>Edit</p>
              </Link>
              <button onClick={handleDelete} type="button" className="flex items-center gap-2">
                <TrashIcon className="h-5 w-5 text-red-500" />
                <p>Delete</p>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

Title.propTypes = {
  recipeId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default Title;
