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
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    //const collectionRef = firestore.collection('users');

    const snapShot = await userRef.get();
    //const collectionSnapshot = await collectionRef.get();

    if (!snapShot.exists) {  // Se verifica si el usuario existe, en caso de no existir, se crea
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
