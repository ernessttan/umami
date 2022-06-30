import { useEffect, useState } from 'react';
import { getAllUsers } from '../firebase/services';

function useUsers() {
  const [userResults, setUserResults] = useState([]);
  useEffect(() => {
    async function getUsers() {
      const users = await getAllUsers();
      setUserResults(users);
    }
    getUsers();
  }, []);
  return userResults;
}

export default useUsers;
