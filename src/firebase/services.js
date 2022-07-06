import {
  setDoc, doc, collection, getDoc,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

/*    Globally Used Refs    */
const usersRef = collection(db, 'users');
// const recipesRef = collection(db, 'recipes');

/*
    Onboarding Services
*/

// Function to add a new user to db
// Input: SignUp Info <Object>
async function addNewUser(user) {
  // Creates a new document in db/users
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

/*
    User db functions
*/

// Function to retrieve a user document from the db
// Input: userId <String>
async function getUserById(userId) {
  // Refer to document by its id
  const docRef = doc(usersRef, userId);
  // Get its information
  const docSnap = await getDoc(docRef);

  return docSnap.data();
}

export { addNewUser, getUserById };
