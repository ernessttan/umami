import { setDoc, doc, collection } from 'firebase/firestore';
import { db } from './firebaseConfig';

/*    Globally Used Refs    */
const usersRef = collection(db, 'users');

// Function to set user document in Firestore
async function setUserProfile(user) {
  await setDoc(doc(usersRef, user.uid), {
    id: user.uid,
    bio: '',
    name: '',
    username: user.displayName,
    email: user.email,
    following: [],
    followers: [],
    dateCreated: Date.now(),
  });
}

export default setUserProfile;
