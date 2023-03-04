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


let shopName = document.querySelector('#shopName');
let ownerName = document.querySelector('#ownerName');
let phoneNo = document.querySelector('#phoneNo');
let address = document.querySelector('#address');
let about = document.querySelector('#about');
let s = document.getElementsByName('s');
let pfp = document.getElementById('pfp');

onAuthStateChanged(auth , (user) => {
    if (user){
        
        email = user.email;

        let update_form = document.querySelector('#details');

        let docRef = doc(db, 'Canteen', email);

        getDoc(docRef)
            .then((doc) => {
                let ob = doc.data().data;
                shopName.value = ob.shopName;
                ownerName.value = ob.ownerName;
                phoneNo.value = ob.phoneNo;
                address.value = ob.address;
                about.value = ob.about

                if(ob.status === false){
                    s[0].checked = true;
                }
                else{
                    s[1].checked = true;
                }
                pfp.src = ob.ImgURL;
            })

    }
});


