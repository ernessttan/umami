import {
  setDoc, doc, collection, getDoc, query, getDocs, where, updateDoc,
  arrayRemove, arrayUnion,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

/*    Globally Used Refs    */
const usersRef = collection(db, 'users');
const recipesRef = collection(db, 'recipes');

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

/*
    Recipe db functions
*/

// Function to get a user's following posts
// Input: userId <String>, followingArr <Array>
async function getFollowingPosts(userId, followingArr) {
  // Query for all the recipes that are created by the users in followingArr
  const q = query(recipesRef, where('userId', 'in', followingArr));
  const response = await getDocs(q);

  const posts = response.docs.map((post) => ({
    ...post.data(),
  }));

  const followingPosts = await Promise.all(
    posts.map(async (post) => {
      // By default the active user does not like a post
      let userLikedPost = false;
      if (post.likes.includes(userId)) {
        // If the active users likes a post flip the status
        userLikedPost = true;
      }
      // Return new object with post info and liked status
      return { ...post, userLikedPost };
    }),
  );

  return followingPosts;
}

/*
    Social functions
*/

// Function to toggle liking a post
async function toggleLike(userId, id, liked) {
  const postRef = doc(db, 'recipes', id);
  updateDoc(postRef, { likes: liked ? arrayUnion(userId) : arrayRemove(userId) });
}

export {
  addNewUser, getUserById, getFollowingPosts, toggleLike,
};
