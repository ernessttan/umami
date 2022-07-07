import {
  setDoc, doc, collection, getDoc, query, getDocs, where, updateDoc,
  arrayRemove, arrayUnion,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from './firebaseConfig';

/*    Globally Used Refs    */
const usersRef = collection(db, 'users');
const recipesRef = collection(db, 'recipes');
const recipeImagesRef = ref(storage, 'recipes');

/*
    Storage functions
*/

// Function to get store image url
async function getImageUrl(recipeId) {
  const result = await getDownloadURL(ref(storage, `recipes/${recipeId}`));
  return result;
}

/*
    Onboarding Services
*/

// Function to add a new user to db
// Input: SignUp Info <Object>
async function addNewUser(user) {
  // Creates a new document in db/users
  await setDoc(doc(usersRef, user.uid), {
    id: user.uid,
    avatarUrl: '',
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
      // By default the auth user does not like a post
      let userLikedPost = false;
      if (post.likes.includes(userId)) {
        // If the auth users likes a post flip the status
        userLikedPost = true;
      }
      // Return new object with post info and liked status
      return { ...post, userLikedPost };
    }),
  );

  return followingPosts;
}

// Function to save recipe to db
// Input: recipe <Object>, imageToStore <File>
async function saveRecipe(recipe, imageToStore) {
  // Storage Reference
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
// Input: userId <String>
async function getUserPosts(userId) {
  const q = query(recipesRef, where('userId', '==', userId));
  const result = await getDocs(q);

  const userPosts = result.docs.map((post) => ({
    ...post.data(),
  }));

  return userPosts;
}

// Function to get a recipe by id
// Input: recipeId <String>, authUserId <String>
async function getRecipeById(recipeId, authUserId) {
  const q = query(recipesRef, where('id', '==', recipeId));
  const result = await getDocs(q);
  const recipeResult = result.docs.map((recipe) => recipe.data());

  const recipe = await Promise.all(
    recipeResult.map(async (post) => {
      let userLikedPost = false;
      if (post.likes.includes(authUserId)) {
        userLikedPost = true;
      }
      return { ...post, userLikedPost };
    }),
  );

  return recipe[0];
}

/*
    Social functions
*/

// Function to toggle liking a post
// Input: userId <String>, id <String>, liked <Boolean>
async function toggleLike(userId, id, liked) {
  const postRef = doc(db, 'recipes', id);
  updateDoc(postRef, { likes: liked ? arrayUnion(userId) : arrayRemove(userId) });
}

// Function to toggle follow
// Input: authUserId <String>, userIdToFollow <String>, isFollowingUser <Boolean>
async function toggleFollow(authUserId, userIdToFollow, isFollowingUser) {
  const authUserRef = doc(db, 'users', authUserId);
  const userRef = doc(db, 'users', userIdToFollow);
  // Update auth users following array
  updateDoc(authUserRef, {
    following: isFollowingUser
      ? arrayRemove(userIdToFollow) : arrayUnion(userIdToFollow),
  });

  // Update followed user's followers array
  updateDoc(userRef, {
    followers: isFollowingUser
      ? arrayRemove(authUserId) : arrayUnion(authUserId),
  });
}

export {
  addNewUser, getUserById, getFollowingPosts,
  toggleLike, saveRecipe, getUserPosts, toggleFollow, getRecipeById,
};
