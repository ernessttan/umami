/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import {
  getDoc, where, doc, collection, getDocs, query, setDoc,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

const usersRef = collection(db, 'users');
const recipesRef = collection(db, 'recipes');

async function addNewUser(user) {
  await setDoc(doc(usersRef, user.uid), {
    username: user.displayName,
    email: user.email,
    uid: user.uid,
    bio: '',
    avatarUrl: '',
    followers: [],
    following: [],
  });
}

async function getUserById(uid) {
  const user = await getDoc(doc(usersRef, uid));
  return user.data();
}

async function getFollowingPosts(followingArr) {
  // Get all the posts of the users that the current user is following
  const response = await getDocs(query(recipesRef, where('uid', 'in', followingArr)));

  const posts = response.docs.map((post) => ({
    ...post.data(),
  }));

  return posts;
}

async function getUserPosts(uid) {
  const response = await getDocs(query(recipesRef, where('uid', '==', uid)));

  const posts = response.docs.map((post) => ({
    ...post.data(),
  }));

  return posts;
}

async function getRecipeById(rid) {
  const recipe = await getDoc(doc(recipesRef, rid));
  return recipe.data();
}

export {
  addNewUser, getUserById, getFollowingPosts, getUserPosts, getRecipeById,
};
