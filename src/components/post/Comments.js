import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { useState, useContext, useEffect } from 'react';
import generateUniqueId from 'generate-unique-id';
import {
  arrayUnion, collection, doc, updateDoc,
} from 'firebase/firestore';
import { XIcon } from '@heroicons/react/solid';
import { UserCircleIcon } from '@heroicons/react/outline';
import { FirebaseContext } from '../../context/firebase';
import AuthContext from '../../context/auth';
import Input from '../forms/Input';

function Comments({
  rid, toggleComments, modalIsOpen, comments,
}) {
  const { db } = useContext(FirebaseContext);
  const { authUser } = useContext(AuthContext);
  const [commentsData, setCommentsData] = useState(comments);
  const [comment, setComment] = useState({
    avatar: '',
    comment: '',
    username: '',
    uid: '',
  });

  // Reset comment state on comment submission
  useEffect(() => {
    setComment((prevComment) => ({
      ...prevComment,
      avatar: authUser.photoURL,
      username: authUser.displayName,
      uid: authUser.uid,
      cid: generateUniqueId({ length: 10 }),
      dateCreated: Date.now(),
    }));
  }, [commentsData]);

  const handleChange = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendComment = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(collection(db, 'recipes'), rid), { comments: arrayUnion(comment) })
        .then(() => {
          setComment({
            avatar: '',
            comment: '',
            username: '',
            uid: '',
          });
          setCommentsData((prevComments) => [...prevComments, comment]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return commentsData && (
    <Modal
      isOpen={modalIsOpen}
      appElement={document.getElementById('root')}
      onRequestClose={toggleComments}
      className="z-10 max-w-4xl h-[75vh] px-4 mx-5 bg-white mt-24 border rounded-lg shadow-xl md:mx-auto border-grey-300"
    >
      <div className="h-full flex flex-col">
        <div className="flex justify-end pt-3">
          <button type="button" onClick={toggleComments} className="text-orange-500 h-5 w-5">
            <XIcon />
          </button>
        </div>
        <h2 className="p-3">Comments</h2>
        <div className="px-3 text-sm">
          <p>{`${commentsData.length} Comments`}</p>
        </div>
        <div className="h-full overflow-y-scroll p-3 md:no-scrollbar">
          {commentsData.map((comment) => (
            <div key={comment.cid} className="border-b border-grey-300 py-2">
              <div className="flex items-center gap-2">
                {
                  comment.avatar ? (<img src={comment.avatar} alt={comment.username} className="rounded-full h-8 w-8 object-cover" />) : (
                    <UserCircleIcon className="h-8 w-8 object-cover" />
                  )
                }
                <p>{comment.username}</p>
              </div>
              <p className="p-1">{comment.comment}</p>
            </div>
          ))}
        </div>
        <div className="sticky p-3 py-5 bg-white border-t border-grey-300 shadow-lg bottom-0 -mx-4">
          <form className="bg-grey-100 w-full flex items-center justify-between p-2 rounded-md">
            <div className="flex items-center gap-3 w-full">
              {authUser.photoURL !== null ? (<img className="rounded-full h-8 w-8 object-cover" src={authUser.photoURL} alt="avatar" />) : (<UserCircleIcon className="w-8 h-8" />)}
              <Input onChange={handleChange} type="text" name="comment" value={comment.comment} className="bg-transparent outline-none w-full" maxLength="50" required />
            </div>
            <button onClick={handleSendComment} className="text-orange-500" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
}

Comments.defaultProps = {
  comments: [],
};

Comments.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  toggleComments: PropTypes.func.isRequired,
  rid: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    cid: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    comment: PropTypes.string.isRequired,
  })),
};

export default Comments;
