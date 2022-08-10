/* eslint-disable no-unused-vars */
import Proptypes from 'prop-types';
import { UserCircleIcon } from '@heroicons/react/outline';

function Post({
  username, title, description, image, uid, id, avatarUrl,
}) {
  return (
    <div className="h-[50vh] flex flex-col gap-2">
      <div className="flex items-center gap-3 px-3">
        {avatarUrl !== '' ? (<img className="rounded-full h-8 w-8 object-cover" src={avatarUrl} alt="avatar" />) : (<UserCircleIcon className="w-8 h-8" />)}
        <p>{username}</p>
      </div>
      <img className="h-2/3 w-full object-cover md:rounded-md " src={image} alt="recipe" />
      <div className="px-3">
        <h3 className="font-semibold">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

Post.defaultProps = {
  avatarUrl: '',
};

Post.propTypes = {
  id: Proptypes.string.isRequired,
  username: Proptypes.string.isRequired,
  title: Proptypes.string.isRequired,
  description: Proptypes.string.isRequired,
  image: Proptypes.string.isRequired,
  uid: Proptypes.string.isRequired,
  avatarUrl: Proptypes.string,

};

export default Post;
