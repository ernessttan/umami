import { useState, useEffect, useContext } from 'react';
import {
  getDocs, query, collection, orderBy, limit,
} from 'firebase/firestore';
import { FirebaseContext } from '../../context/firebase';
import UserCard from '../UserCard';

function SuggestedUsers() {
  const { db } = useContext(FirebaseContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const q = query(collection(db, 'users'), orderBy('username'), limit(4));
      try {
        await getDocs(q)
          .then((users) => {
            const userData = users.docs.map((user) => user.data());
            setUsers(userData);
          });
      } catch (error) {
        console.log(error.message);
      }
    };
    getUsers();
  }, []);
  return (
    <div className="hidden md:block basis-1/3">
      <h3 className="text-grey-700">Suggested Users</h3>
      <div className="grid py-5 gap-5">
        {users.map((user) => (
          <UserCard
            key={user.id}
            uid={user.uid}
            avatar={user.avatarUrl}
            username={user.username}
            name={user.name}
          />
        ))}
      </div>
    </div>
  );
}

export default SuggestedUsers;
