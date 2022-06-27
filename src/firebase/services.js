/* eslint-disable no-unused-vars */
import {
  setDoc, doc, collection, query, where, getDocs, updateDoc, arrayRemove, arrayUnion, getDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from './firebaseConfig';

/*    Globally Used Refs    */
const usersRef = collection(db, 'users');
const recipesRef = collection(db, 'recipes');
const recipeImagesRef = ref(storage, 'recipes');

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

// Function to get store image url
async function getImageUrl(recipeId) {
  const result = await getDownloadURL(ref(storage, `recipes/${recipeId}`));
  return result;
}

// Function to save recipe to firestore and image in storage
async function saveRecipe(recipe, imageToStore) {
  const spaceRef = ref(recipeImagesRef, `${recipe.id}`);
  // Save image to storage
  await uploadBytes(spaceRef, imageToStore);
  // Save recipe to recipes in firestore
  await setDoc(doc(recipesRef, recipe.id), recipe);
  // Get url of stored image
  const url = await getImageUrl(recipe.id);
  // Update recipe with url
  updateDoc(doc(recipesRef, recipe.id), { imageUrl: url });
}

// Function to get a users posts
async function loadUserPosts(userId) {
  const q = query(recipesRef, where('userId', '==', userId));
  const result = await getDocs(q);

  const userPosts = result.docs.map((post) => ({
    ...post.data(),
  }));

  return userPosts;
}

// Function to check if active user is following a user
async function isActiveUserFollowing(activeUserId, userId) {
  const followingQuery = query(usersRef, where('id', '==', activeUserId), where('following', 'array-contains', userId));
  if (followingQuery) {
    // If the query returns a result
    return true;
  }
  return false;
}

// Function to toggle follow
async function toggleFollow(userId, userIdToFollow, isFollowingUser) {
  const userRef = doc(db, 'users', userId);
  updateDoc(userRef, {
    following: isFollowingUser
      ? arrayRemove(userIdToFollow) : arrayUnion(userIdToFollow),
  });
}

export {
  setUserProfile,
  getUserByUsername,
  getFollowingPosts,
  toggleLike,
  getImageUrl,
  saveRecipe,
  loadUserPosts,
  isActiveUserFollowing,
  toggleFollow,
};
