import {
  setDoc, doc, collection, query, where, getDocs, updateDoc, arrayRemove, arrayUnion,
} from 'firebase/firestore';
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

// Function to retrieve user's information using username
async function getUserByUsername(username) {
  const q = query(usersRef, where('username', '==', username));
  const result = await getDocs(q);
  const userResult = result.docs.map((user) => user.data());
  return userResult[0];
}

// Function to toggle liking a post
async function toggleLike(userId, id, liked) {
  const recipesRef = doc(db, 'recipes', id);
  updateDoc(recipesRef, { likes: liked ? arrayUnion(userId) : arrayRemove(userId) });
}

export { setUserProfile, getUserByUsername, toggleLike };
