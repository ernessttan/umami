import {
  setDoc, doc, collection, query, where, getDocs, updateDoc, arrayRemove, arrayUnion,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

/*    Globally Used Refs    */
const usersRef = collection(db, 'users');
const recipesRef = collection(db, 'recipes');

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

// Function to get a user's following posts
async function getFollowingPosts(userId, userFollowingArr) {
  const q = query(recipesRef, where('userId', 'in', userFollowingArr));
  const result = await getDocs(q);

  const followingPosts = result.docs.map((post) => ({
    ...post.data(),
  }));

  const userFollowingPosts = await Promise.all(
    followingPosts.map(async (post) => {
      let userLikedPost = false;
      if (post.likes.includes(userId)) {
        userLikedPost = true;
      }

      return { ...post, userLikedPost };
    }),
  );

  return userFollowingPosts;
}

// Function to toggle liking a post
async function toggleLike(userId, id, liked) {
  const postRef = doc(db, 'recipes', id);
  updateDoc(postRef, { likes: liked ? arrayUnion(userId) : arrayRemove(userId) });
}

export {
  setUserProfile, getUserByUsername, getFollowingPosts, toggleLike,
};
