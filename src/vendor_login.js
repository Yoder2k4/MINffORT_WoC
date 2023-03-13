import { initializeApp } from "firebase/app";

import {
    getFirestore,
    doc,
    getDoc,
    updateDoc
} from 'firebase/firestore'

import { 
    getAuth,
    onAuthStateChanged,
    signOut 
} from 'firebase/auth'

const firebaseConfig2 = {
    apiKey: "AIzaSyCySlvJttSd0wWiKuZ83CP_lRaUNQXTcdM",
    authDomain: "minffort-woc-vendor.firebaseapp.com",
    projectId: "minffort-woc-vendor",
    storageBucket: "minffort-woc-vendor.appspot.com",
    messagingSenderId: "981907816915",
    appId: "1:981907816915:web:55af6abe5cc5489b9aef26"
};

let app = initializeApp(firebaseConfig2, "vendor");

let db = getFirestore(app);

let auth = getAuth(app);


let shopName = document.querySelector('#shopName');
let ownerName = document.querySelector('#ownerName');
let phoneNo = document.querySelector('#phoneNo');
let address = document.querySelector('#address');
let about = document.querySelector('#about');
let s = document.getElementsByName('s');
let pfp = document.getElementById('pfp');


onAuthStateChanged(auth , (user) => {
    if (user){
        
        let email = user.email;
        let st;

        let docRef = doc(db, 'Canteen', email);

        getDoc(docRef)
            .then((doc) => {

                let ob = doc.data().data;
                
                pfp.src = doc.data().ImgURL;

                shopName.value = ob.shopName;
                ownerName.value = ob.ownerName;
                phoneNo.value = ob.phoneNo;
                address.value = ob.address;
                about.value = ob.about;

                if(ob.status === false){
                    s[0].checked = true;
                }
                else{
                    s[1].checked = true;
                }
            })

        let update_form = document.querySelector('#details');

        update_form.addEventListener('submit', (e) => {
            e.preventDefault();

            if(s[0].checked){
                st = false;
            }
            if(s[1].checked){
                st = true;
            }
            let data = {
                shopName: update_form.shopName.value,
                ownerName: update_form.ownerName.value,
                phoneNo: update_form.phoneNo.value,
                address: update_form.address.value,
                about: update_form.about.value,
                status: st
            };

            updateDoc(docRef, { data })
                .then(() => {
                    console.log("Changes saved");
                })
        }); 
    }
});

// Log Out
let log_out = document.getElementById('logout');

log_out.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log("User logged out");
            
            window.location.replace("index.html");
        })
        .catch((err) => {
            console.log(err.message);
            console.log(err.code);
        })
});
