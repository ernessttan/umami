import PropTypes from 'prop-types';
import UserCard from '../../Common/UserCard';
import useUsers from '../../../hooks/useUsers';

function UserResults({ searchQuery }) {
  const users = useUsers();

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
