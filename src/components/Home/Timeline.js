/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import { useContext, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import UserProfileContext from '../../context/UserProfileContext';
import { getFollowingPosts } from '../../firebase/services';

function Timeline() {
  const { profile } = useContext(UserProfileContext);
  const { profile: { following } = {} } = useContext(UserProfileContext);
  const [timeline, setTimeline] = useState();

  // Updates when active user's following array is modified
  useEffect(() => {
    const getTimeline = async () => {
      await getFollowingPosts(profile?.id, following)
        .then((posts) => {
          // Sort by newest
          posts.sort((a, b) => b.dateCreated - a.dateCreated);
          setTimeline(posts);
        });
    };
    getTimeline();
  }, [following]);

  return (
    <div className="md:order-2 md:grow">
      {following === undefined ? (
        <Skeleton count={3} className="w-full h-[35vh] mb-2" />
      ) : following.length === 0 ? (
        <h1 className="text-grey-500 font-bold text-center">
          Follow Someone To
          <br />
          View Some Recipes
        </h1>
      ) : timeline ? (
        timeline.map((post) => (
          <Post />
        ))) : null}
    </div>
  );
}

export default Timeline;
