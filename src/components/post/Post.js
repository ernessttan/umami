/* eslint-disable no-unused-vars */
import Proptypes from 'prop-types';
import { UserCircleIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import Actions from './Actions';

function Post({
  username, title, caption, image, uid, rid, avatar, likes, comments, authUserLiked,
}) {
  return (
    <div className="h-[50vh] flex flex-col gap-2">
      <div className="flex items-center gap-3 px-3">
        {avatar !== '' ? (<img className="rounded-full h-8 w-8 object-cover" src={avatar} alt="avatar" />) : (<UserCircleIcon className="w-8 h-8" />)}
        <p>{username}</p>
      </div>
      <Link to={`/recipe/${rid}`} className="h-2/3">
        <img className="w-full h-full object-cover md:rounded-md" src={image} alt="recipe" />
      </Link>
      <div className="px-3">
        <h3 className="font-semibold">{title}</h3>
        <p>{caption}</p>
      </div>
      <Actions likes={likes} comments={comments} authUserLiked={authUserLiked} rid={rid} />
    </div>
  );
}

Post.defaultProps = {
  avatar: '',
  likes: [],
  comments: [],
};

Post.propTypes = {
  rid: Proptypes.string.isRequired,
  username: Proptypes.string.isRequired,
  title: Proptypes.string.isRequired,
  caption: Proptypes.string.isRequired,
  image: Proptypes.string.isRequired,
  uid: Proptypes.string.isRequired,
  avatar: Proptypes.string,
  likes: Proptypes.arrayOf(Proptypes.string),
  comments: Proptypes.arrayOf(Proptypes.string),
  authUserLiked: Proptypes.bool.isRequired,
};

export default Post;