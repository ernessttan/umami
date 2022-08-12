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
  const [users, setUsers] = useState([]);

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
            console.log(filteredUsers);
            setUsers(filteredUsers);
          });
      } catch (error) {
        console.log(error.message);
      }
    };
    getUsers();
  }, [searchQuery]);

  return (
    <div className="grid py-5 gap-5">
      { users === undefined ? (
        <div className="flex items-center gap-3">
          <Skeleton count={5} circle height={50} width={50} className="my-2" />
          <Skeleton count={5} height={50} width={290} className="my-2" />
        </div>
      ) : (
        filterResults(searchQuery, users).map((user) => (
          <UserCard
            key={user.id}
            uid={user.uid}
            avatar={user.avatar}
            username={user.username}
            name={user.name}
          />
        ))
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
