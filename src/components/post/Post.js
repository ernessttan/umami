/* eslint-disable no-unused-vars */
import Proptypes from 'prop-types';
import { UserCircleIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import Actions from './Actions';

function Post({
  username, title, caption, image, uid, rid, avatar, likes, comments, authUserLiked, authUserSaved,
}) {
  return (
    <div className="flex flex-col gap-2 mb-5">
      <Link to={`/profile/${uid}`} className="flex items-center gap-3 px-3">
        {avatar.length !== '' ? (<img className="rounded-full h-8 w-8 object-cover border-grey-100 border" src={avatar} alt="avatar" />) : (<UserCircleIcon className="w-8 h-8" />)}
        <p>{username}</p>
      </Link>
      <Link to={`/recipe/${rid}`}>
        <img src={image} className="w-full h-72 object-cover md:h-80 md:rounded-md" alt="recipe" />
      </Link>
      <div className="px-3">
        <h3 className="font-semibold">{title}</h3>
        <p>{caption}</p>
      </div>
      <div className="px-3">
        <Actions
          likes={likes}
          comments={comments}
          authUserLiked={authUserLiked}
          authUserSaved={authUserSaved}
          rid={rid}
        />
      </div>
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
  comments: Proptypes.arrayOf(Proptypes.shape({
    cid: Proptypes.string.isRequired,
    username: Proptypes.string.isRequired,
    avatar: Proptypes.string,
    comment: Proptypes.string.isRequired,
  })),
  authUserLiked: Proptypes.bool.isRequired,
  authUserSaved: Proptypes.bool.isRequired,
};

export default Post;
