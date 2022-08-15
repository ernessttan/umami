import { useState, useEffect, useContext } from 'react';
import {
  getDocs, query, collection, orderBy, limit,
} from 'firebase/firestore';
import { FirebaseContext } from '../../context/firebase';
import UserCard from '../../components/UserCard';

function SuggestedUsers() {
  const { db, auth } = useContext(FirebaseContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const q = query(collection(db, 'users'), orderBy('username'), limit(4));
      try {
        await getDocs(q)
          .then((users) => {
            const userData = users.docs.map((user) => user.data());
            setUsers(userData.filter((user) => user.uid !== auth.currentUser.uid));
          });
      } catch (error) {
        console.log(error.message);
      }
    };
    getUsers();
  }, []);
  return (
    <div className="hidden md:block md:col-span-1">
      <h3 className="text-grey-700">Suggested Users</h3>
      <div className="grid py-5 gap-5">
        {users.map((user) => (
          <UserCard
            key={user.uid}
            uid={user.uid}
            avatar={user.avatar}
            username={user.username}
            name={user.name}
          />
        ))}
      </div>
    </div>
  );
}

export default SuggestedUsers;
