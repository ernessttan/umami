import { useContext, useState, useEffect } from 'react';
import {
  getDocs, query, collection, orderBy,
} from 'firebase/firestore';
import Proptypes from 'prop-types';
import { FirebaseContext } from '../../context/firebase';
import UserCard from '../UserCard';

function UserResults({ searchQuery }) {
  const { db } = useContext(FirebaseContext);
  const [users, setUsers] = useState([]);

  const filterResults = (query, userArr) => userArr.filter(
    (user) => user.username.toLowerCase().includes(query),
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
  }, []);

  return users && (
    <div className="grid py-5 gap-5">
      {
        filterResults(searchQuery, users).map((user) => (
          <UserCard
            key={user.id}
            uid={user.uid}
            avatar={user.avatarUrl}
            username={user.username}
            name={user.name}
          />
        ))
      }
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
