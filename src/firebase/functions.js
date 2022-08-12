/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import {
  getDoc, where, doc, collection, getDocs, query, setDoc, updateDoc, arrayRemove, arrayUnion,
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
    avatar: '',
    followers: [],
    following: [],
    posts: [],
    name: '',
  });
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
    let authUserLiked = false;
    if (post.likes.includes(authUserId)) {
      authUserLiked = true;
    }
    return { ...post, authUserLiked };
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

  let authUserLiked = false;
  if (recipe.likes.includes(authUserId)) {
    authUserLiked = true;
  }
  return { ...recipe, authUserLiked };
}

async function toggleFollow(authUserId, uid, isFollowingUser) {
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

export {
  addNewUser, getUserById, getFollowingPosts, getUserPosts,
  getRecipeById, toggleFollow, isAuthUserFollowing, toggleLike,
};
