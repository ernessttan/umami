import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import * as ROUTES from '../../constants/routes';

function Actions({ username }) {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div>
        {user.displayName === username ? (
          <Link
            to={ROUTES.EDIT_PROFILE}
            type="button"
            className="w-full bg-orange-500 text-white flex justify-center p-3 rounded-full"
          >
            Edit Profile
          </Link>
        ) : (
          <button type="button" className="w-full bg-orange-500 text-white flex justify-center p-3 rounded-full">Follow</button>
        )}
      </div>
    </div>
  );
}

Actions.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Actions;
