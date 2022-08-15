/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import {
  getDoc, where, doc, collection, getDocs, query, setDoc, updateDoc, arrayRemove,
  arrayUnion, deleteDoc,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from './firebaseConfig';

const usersRef = collection(db, 'users');
const recipesRef = collection(db, 'recipes');

async function addNewUser(user) {
  await setDoc(doc(usersRef, user.uid), {
    username: user.displayName,
    email: user.email,
    uid: user.uid,
    bio: '',
    avatar: '',
    followers: [],
    following: [],
    posts: [],
    savedPosts: [],
    name: '',
  });
}

async function didAuthUserSave(authUserId, rid) {
  const authUserRef = doc(db, 'users', authUserId);
  const authUser = await getDoc(authUserRef);
  const authUserSavedPosts = authUser.data().savedPosts;

  return authUserSavedPosts.includes(rid);
}

async function getUserById(uid) {
  const user = await getDoc(doc(usersRef, uid));
  return user.data();
}

async function getFollowingPosts(authUserId, followingArr) {
  // Get all the posts of the users that the current user is following
  const response = await getDocs(query(recipesRef, where('uid', 'in', followingArr)));

  const posts = response.docs.map((post) => ({
    ...post.data(),
  }));

  const postsWithLikes = await Promise.all(posts.map(async (post) => {
    const authUserSaved = await didAuthUserSave(authUserId, post.rid);
    let authUserLiked = false;
    if (post.likes.includes(authUserId)) {
      authUserLiked = true;
    }
    return { ...post, authUserLiked, authUserSaved };
  }));

  return postsWithLikes;
}

async function getSavedPosts(authUserId, savedIdsArr) {
  const response = await getDocs(query(recipesRef, where('rid', 'in', savedIdsArr)));

  const posts = response.docs.map((post) => ({
    ...post.data(),
  }));

  const postsWithLikes = await Promise.all(posts.map(async (post) => {
    const authUserSaved = await didAuthUserSave(authUserId, post.rid);
    let authUserLiked = false;
    if (post.likes.includes(authUserId)) {
      authUserLiked = true;
    }
    return { ...post, authUserLiked, authUserSaved };
  }));

  return postsWithLikes;
}

async function getUserPosts(uid) {
  const response = await getDocs(query(recipesRef, where('uid', '==', uid)));

  const posts = response.docs.map((post) => ({
    ...post.data(),
  }));

  return posts;
}

async function getRecipeById(authUserId, rid) {
  const response = await getDoc(doc(recipesRef, rid));
  const recipe = response.data();

  const authUserSaved = await didAuthUserSave(authUserId, rid);
  let authUserLiked = false;
  if (recipe.likes.includes(authUserId)) {
    authUserLiked = true;
  }
  return { ...recipe, authUserLiked, authUserSaved };
}

async function toggleFollow(authUserId, uid, isFollowingUser) {
  console.log(isFollowingUser);
  const authUserRef = doc(db, 'users', authUserId);
  const userRef = doc(db, 'users', uid);
  // Update auth users following array
  updateDoc(authUserRef, {
    following: isFollowingUser
      ? arrayRemove(uid) : arrayUnion(uid),
  });

  // Update followed user's followers array
  updateDoc(userRef, {
    followers: isFollowingUser
      ? arrayRemove(authUserId) : arrayUnion(authUserId),
  });
}

async function isAuthUserFollowing(authUserId, uid) {
  const authUserRef = doc(db, 'users', authUserId);
  const authUser = await getDoc(authUserRef);
  const authUserFollowing = authUser.data().following;

  return authUserFollowing.includes(uid);
}

async function toggleLike(userId, rid, isLiked) {
  const postRef = doc(db, 'recipes', rid);
  updateDoc(postRef, { likes: isLiked ? arrayRemove(userId) : arrayUnion(userId) });
}

async function toggleSave(authUserId, rid, isSaved) {
  const authUserRef = doc(db, 'users', authUserId);
  updateDoc(authUserRef, { savedPosts: isSaved ? arrayRemove(rid) : arrayUnion(rid) });
}

async function deleteRecipe(rid) {
  const recipeRef = doc(db, 'recipes', rid);
  const imageRef = ref(storage, `recipes/${rid}`);

  await deleteDoc(recipeRef);
  await deleteObject(imageRef);
}

async function getProfiles(idArr) {
  const response = await getDocs(query(usersRef, where('uid', 'in', idArr)));

  const users = response.docs.map((user) => ({
    ...user.data(),
  }));

  return users;
}

export {
  addNewUser, getUserById, getFollowingPosts, getUserPosts,
  getRecipeById, toggleFollow, isAuthUserFollowing, toggleLike,
  didAuthUserSave, toggleSave, getSavedPosts, deleteRecipe,
  getProfiles,
};
