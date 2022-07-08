import { useContext } from 'react';
import BackButton from '../components/common/BackButton';
import AuthContext from '../context/AuthContext';
import useUser from '../hooks/useUser';
import EditRecipe from '../components/EditRecipe/EditRecipe';

function EditRecipeUpload() {
  const { authUser } = useContext(AuthContext);
  const { profile } = useUser(authUser.uid);

  return profile ? (
    <div className="p-5 md:px-20 md:container md:max-w-screen-lg">
      <div className="py-5">
        <BackButton />
      </div>
      <EditRecipe
        avatarUrl={profile.avatarUrl}
        username={authUser.displayName}
        userId={authUser.uid}
      />
    </div>
  ) : null;
}

export default EditRecipeUpload;
