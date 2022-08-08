/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import {
  getDoc, where, doc, collection, getDocs, query, setDoc,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

const usersRef = collection(db, 'users');

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

export { addNewUser };
