import { DotsHorizontalIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import PropTypes from 'prop-types';
import OptionsMenu from '../menus/OptionsMenu';

function OptionsButton({ item, itemId }) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const toggleOptions = () => setIsOptionsOpen(!isOptionsOpen);

  return (
    <div className="relative">
      <button className="h-6 w-6" onClick={toggleOptions} type="button">
        <DotsHorizontalIcon />
      </button>
      <OptionsMenu isOptionsOpen={isOptionsOpen} item={item} itemId={itemId} />
    </div>
  );
}

OptionsButton.propTypes = {
  item: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
};

export default OptionsButton;
