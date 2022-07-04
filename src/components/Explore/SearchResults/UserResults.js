import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserCard from '../../common/UserCard';
import { getAllUsers } from '../../../firebase/services';

function UserResults({ searchQuery }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      await getAllUsers()
        .then((allUsers) => {
          setUsers(allUsers);
        });
    };
    getUsers();
  }, []);

  const filterResults = (query, userArr) => userArr.filter(
    (user) => user.username.toLowerCase().includes(query),
  );

  const userList = filterResults(searchQuery, users).map((user) => (
    <UserCard
      key={user.id}
      id={user.id}
      avatarUrl={user.avatarUrl}
      username={user.username}
      name={user.name}
    />
  ));

  return (
    <div className="grid p-5 gap-5">
      {userList}
    </div>
  );
}

UserResults.defaultProps = {
  searchQuery: '',
};

UserResults.propTypes = {
  searchQuery: PropTypes.string,
};

export default UserResults;
