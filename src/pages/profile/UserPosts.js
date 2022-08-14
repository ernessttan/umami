import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';
import { getUserPosts } from '../../firebase/functions';
import RecipeCard from '../../components/RecipeCard';
import CardGrid from '../../components/CardGrid';

function UserPosts({ uid }) {
  const [userPosts, setUserPosts] = useState();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        await getUserPosts(uid)
          .then((posts) => {
            setUserPosts(posts);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserPosts();
  }, [uid]);

  return (
    <div>
      {userPosts === undefined ? (
        <CardGrid>
          <Skeleton count={2} className="w-full h-36" />
          <Skeleton count={2} className="w-full h-36" />
        </CardGrid>
      ) : userPosts.length === 0 ? (
        <div className="flex flex-col items-center mt-10">
          <h1 className="text-grey-500">No Posts To Show</h1>
          <Link to="/upload" className="text-orange-500 font-semibold py-3 hover:underline decoration-2">
            Try Posting Something
          </Link>
        </div>
      ) : userPosts ? (
        <CardGrid>
          {
              userPosts.map((post) => (
                <RecipeCard
                  key={post.rid}
                  title={post.title}
                  image={post.image}
                  rid={post.rid}
                  likes={post.likes}
                />
              ))
          }
        </CardGrid>
      ) : null}
    </div>
  );
}

UserPosts.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default UserPosts;
