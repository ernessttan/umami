import Modal from 'react-modal';
import Proptypes from 'prop-types';
import { useState, useEffect } from 'react';
import { XIcon } from '@heroicons/react/solid';
import UserCard from '../../components/cards/UserCard';
import { getProfiles } from '../../firebase/functions';

function Following({ following, toggleFollowing, isModalOpen }) {
  const [followerProfiles, setFollowerProfiles] = useState();

  useEffect(() => {
    const fetchFollowingProfiles = async () => {
      try {
        await getProfiles(following)
          .then((response) => {
            setFollowerProfiles(response);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchFollowingProfiles();
  }, [following]);

  return followerProfiles && (
    <Modal
      isOpen={isModalOpen}
      appElement={document.getElementById('root')}
      onRequestClose={toggleFollowing}
      className="z-10 max-w-lg h-52 mx-5 bg-white mt-24 border rounded-lg shadow-xl md:mx-auto border-grey-300"
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-3 border-b-1 border-grey-100">
          <div className="grow-1" />
          <p className="text-lg font-semibold">Following</p>
          <button type="button" onClick={toggleFollowing} className="text-orange-500 h-5 w-5 grow-1">
            <XIcon />
          </button>
        </div>
        <div className="border-b border-grey-100" />
        <div className="h-full flex flex-col gap-2 overflow-y-scroll scrollbar-thumb-grey-300 scrollbar-thin p-3">
          {followerProfiles.map((follower) => (
            <UserCard
              key={follower.uid}
              uid={follower.uid}
              avatar={follower.avatar}
              username={follower.username}
              name={follower.name}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
}

Following.propTypes = {
  following: Proptypes.array.isRequired,
  toggleFollowing: Proptypes.func.isRequired,
  isModalOpen: Proptypes.bool.isRequired,
};

export default Following;
