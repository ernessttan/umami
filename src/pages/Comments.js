import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../components/Common/PageHeader';
import CommentList from '../components/Comments/CommentList';
import AddComment from '../components/Comments/AddComment';
import { getRecipeById } from '../firebase/services';

function Comments() {
  const { id } = useParams();
  const [allComments, setAllComments] = useState([]);

  // Get Comments and set state
  const fetchComments = async () => {
    const { comments } = await getRecipeById(id);
    setAllComments(comments.reverse());
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  return (
    <>
      <div className="py-8 px-5">
        <PageHeader title="Comments" />
        {allComments && (
        <div>
          <CommentList comments={allComments} />
        </div>
        )}
      </div>
      <AddComment
        comments={allComments}
        setAllComments={setAllComments}
        recipeId={id}
      />
    </>

  );
}

export default Comments;
