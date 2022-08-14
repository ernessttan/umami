import Proptypes from 'prop-types';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { Link, useNavigate } from 'react-router-dom';
import { deleteRecipe } from '../firebase/functions';

function OptionsMenu({ isOptionsOpen, item, itemId }) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    await deleteRecipe(itemId)
      .then(() => {
        navigate(-1);
      });
  };

  return (
    <div
      className={`origin-top-right absolute right-2 bg-white shadow-lg rounded w-40 p-3 z-40 flex flex-col gap-1 border border-grey-100 ${
        isOptionsOpen ? '' : 'hidden'
      }`}
    >
      <Link
        to={`/edit${item}/${itemId}`}
        className="flex items-center w-full gap-2 py-2 text-black rounded-md hover:bg-grey-100"
      >
        <PencilIcon className="w-5 h-5" />
        <p>
          Edit
          {` ${item}`}
        </p>
      </Link>
      <button
        onClick={handleDelete}
        type="button"
        className="flex items-center w-full gap-2 py-2 text-black rounded-md hover:bg-grey-100"
      >
        <TrashIcon className="w-5 h-5 fill-red-500" />
        <p>
          Delete
          {` ${item}`}
        </p>
      </button>
    </div>
  );
}

OptionsMenu.propTypes = {
  isOptionsOpen: Proptypes.bool.isRequired,
  item: Proptypes.string.isRequired,
  itemId: Proptypes.string.isRequired,
};

export default OptionsMenu;
