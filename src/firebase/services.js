/* eslint-disable no-unused-vars */
import {
  setDoc, doc, collection, query, where, getDocs, updateDoc,
  arrayRemove, arrayUnion, getDoc, orderBy,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from './firebaseConfig';

/*    Globally Used Refs    */
const usersRef = collection(db, 'users');
const recipesRef = collection(db, 'recipes');
const recipeImagesRef = ref(storage, 'recipes');

// Function to save user document in Firestore on Signup
async function addNewUser(user) {
  // Uses active users id as the doc
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

// Get a user object from db using a users id
async function getUserById(userId) {
  const docRef = doc(usersRef, userId);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
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

// Function to handle edits for a users profile
async function saveEditedProfile(userId, updatedProfile) {
  await updateDoc(doc(usersRef, userId), updatedProfile);
}

// Function to get a recipe by id
async function getRecipeById(recipeId) {
  const q = query(recipesRef, where('id', '==', recipeId));
  const result = await getDocs(q);
  const recipeResult = result.docs.map((recipe) => recipe.data());

  return recipeResult[0];
}

// Function to add comment
async function addComment(comment, recipeId) {
  updateDoc(doc(recipesRef, recipeId), { comments: arrayUnion(comment) });
}

// Function to get all users
async function getAllUsers() {
  const q = query(usersRef, orderBy('username'));
  const result = await getDocs(q);
  const userResult = result.docs.map((user) => user.data());

  return userResult;
}

// Function to get all recipes
async function getAllRecipes() {
  const q = query(recipesRef, orderBy('title'));
  const result = await getDocs(q);
  const recipeResult = result.docs.map((recipe) => recipe.data());

  return recipeResult;
}

export {
  getUserById,
  addNewUser,
  getUserByUsername,
  getFollowingPosts,
  toggleLike,
  getImageUrl,
  saveRecipe,
  loadUserPosts,
  isActiveUserFollowing,
  toggleFollow,
  saveEditedProfile,
  getRecipeById,
  addComment,
  getAllUsers,
  getAllRecipes,
};
