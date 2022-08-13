/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from 'react';
import {
  getDocs, query, collection, orderBy,
} from 'firebase/firestore';
import Proptypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { FirebaseContext } from '../../context/firebase';
import UserCard from '../UserCard';
import 'react-loading-skeleton/dist/skeleton.css';

function UserResults({ searchQuery }) {
  const { db, auth } = useContext(FirebaseContext);
  const [users, setUsers] = useState();

  const filterResults = (query, userArr) => userArr.filter(
    (user) => user.username.toLowerCase().includes(query) && user.uid !== auth.currentUser.uid,
  );

  useEffect(() => {
    const getUsers = async () => {
      const q = query(collection(db, 'users'), orderBy('username'));
      try {
        await getDocs(q)
          .then((users) => {
            const userData = users.docs.map((user) => user.data());
            const filteredUsers = filterResults(searchQuery, userData);
            setUsers(filteredUsers);
          });
      } catch (error) {
        console.log(error.message);
      }
    };
    getUsers();
  }, [searchQuery]);

  return (
    <div>
      { users === undefined ? (
        <div className="flex items-center w-full py-5">
          <Skeleton count={10} circle height={50} width={50} className="my-2" containerClassName="basis-1/6 md:basis-1/12" />
          <Skeleton count={10} height={50} width="100%" className="my-2" containerClassName="basis-5/6 md:basis-11/12" />
        </div>
      ) : (
        <div className="grid py-5 gap-5">
          {
             filterResults(searchQuery, users).map((user) => (
               <UserCard
                 key={user.uid}
                 uid={user.uid}
                 avatar={user.avatar}
                 username={user.username}
                 name={user.name}
               />
             ))
          }

        </div>
      )}
    </div>

  );
}

UserResults.defaultProps = {
  searchQuery: '',
};

UserResults.propTypes = {
  searchQuery: Proptypes.string,
};

export default UserResults;
