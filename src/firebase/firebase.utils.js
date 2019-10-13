import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDw-Tc4XZ26SMCUicDvnhCNkXagKTWmxlY",
    authDomain: "ecommerce-react-course.firebaseapp.com",
    databaseURL: "https://ecommerce-react-course.firebaseio.com",
    projectId: "ecommerce-react-course",
    storageBucket: "ecommerce-react-course.appspot.com",
    messagingSenderId: "149855514276",
    appId: "1:149855514276:web:2320731558bbc3f5c9c031",
    measurementId: "G-ST2SZXQJDB"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
