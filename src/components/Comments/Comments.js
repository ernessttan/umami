/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../../firebase/services';
import Comment from './Comment';
import AddComment from './AddComment';
import Header from './Header';

function Comments() {
  const { id } = useParams();
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    // Get Comments and set state
    const fetchComments = async () => {
      const { comments } = await getRecipeById(id);
      setAllComments(comments.reverse());
    };
    fetchComments();
  }, [id]);

  const commentList = allComments.map((comment) => (
    <Comment
      key={comment.id}
      avatarUrl={comment.avatarUrl}
      username={comment.username}
      content={comment.content}
      dateCreated={comment.dateCreated}
    />
  ));

  return (
    <div className="flex flex-col h-full mb-5 relative md:desktop-content">
      <Header />
      <div className="px-5 py-5 grow overflow-y-scroll">
        {commentList}
      </div>
      <AddComment recipeId={id} comments={allComments} setAllComments={setAllComments} />
    </div>
  );
}

export default Comments;
