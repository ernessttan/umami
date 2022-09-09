import Modal from 'react-modal';
import Proptypes from 'prop-types';
import { useState, useEffect } from 'react';
import { XIcon } from '@heroicons/react/solid';
import UserCard from '../../components/cards/UserCard';
import { getProfiles } from '../../firebase/functions';

function Followers({ followers, toggleFollowers, isModalOpen }) {
  const [followerProfiles, setFollowerProfiles] = useState();

  useEffect(() => {
    const fetchFollowersProfiles = async () => {
      try {
        await getProfiles(followers)
          .then((response) => {
            setFollowerProfiles(response);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchFollowersProfiles();
  }, [followers]);

  return followerProfiles && (
    <Modal
      isOpen={isModalOpen}
      appElement={document.getElementById('root')}
      onRequestClose={toggleFollowers}
      className="z-10 max-w-xl h-72 mx-5 bg-white mt-24 border rounded-lg shadow-xl md:mx-auto border-grey-300"
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-3 border-b-1 border-grey-100">
          <div className="grow-1" />
          <p className="text-lg font-semibold">Followers</p>
          <button type="button" onClick={toggleFollowers} className="text-orange-500 h-5 w-5 grow-1">
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

Followers.propTypes = {
  followers: Proptypes.array.isRequired,
  toggleFollowers: Proptypes.func.isRequired,
  isModalOpen: Proptypes.bool.isRequired,
};

export default Followers;
