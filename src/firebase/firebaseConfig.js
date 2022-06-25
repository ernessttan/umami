import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const config = {
  apiKey: 'AIzaSyDTEhVG4RskVXsIeJcuuhfyCVsGJnO6IbA',
  authDomain: 'umami-ae4ad.firebaseapp.com',
  projectId: 'umami-ae4ad',
  storageBucket: 'umami-ae4ad.appspot.com',
  messagingSenderId: '174190812871',
  appId: '1:174190812871:web:2a0dc4be75fd1897aea8e2',
  measurementId: 'G-ZHN3ET2XP4',
};

const app = initializeApp(config);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();

export {
  app, db, auth, storage,
};
