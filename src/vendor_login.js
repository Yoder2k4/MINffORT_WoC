import { initializeApp } from "firebase/app";

const firebaseConfig2 = {
    apiKey: "AIzaSyCySlvJttSd0wWiKuZ83CP_lRaUNQXTcdM",
    authDomain: "minffort-woc-vendor.firebaseapp.com",
    projectId: "minffort-woc-vendor",
    storageBucket: "minffort-woc-vendor.appspot.com",
    messagingSenderId: "981907816915",
    appId: "1:981907816915:web:55af6abe5cc5489b9aef26"
};

let app = initializeApp(firebaseConfig2, "vendor");

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

let auth = getAuth(app);

import {
    getFirestore,
    onSnapshot,
    doc,
    getDoc,
    query,
    where,
    updateDoc
} from 'firebase/firestore'

let db = getFirestore(app);



let email;

onAuthStateChanged(auth , (user) => {
    if (user){
        
        email = user.email;

        let update_form = document.querySelector('#details');

        let docRef = doc(db, 'Canteen', email);

        getDoc(docRef)
            .then((doc) => {
                console.log(doc.data(), doc.id);
            })

    }
});


