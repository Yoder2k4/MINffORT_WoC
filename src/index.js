import { initializeApp } from 'firebase/app'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig1 = {
    apiKey: "AIzaSyDdlreOuCBueGm0T9tpwUzATh1UUgYNWBc",
    authDomain: "minffort-woc-4f840.firebaseapp.com",
    projectId: "minffort-woc-4f840",
    storageBucket: "minffort-woc-4f840.appspot.com",
    messagingSenderId: "457469509851",
    appId: "1:457469509851:web:bf59838ddfee11c5748cfe"
};

const firebaseConfig2 = {
    apiKey: "AIzaSyCySlvJttSd0wWiKuZ83CP_lRaUNQXTcdM",
    authDomain: "minffort-woc-vendor.firebaseapp.com",
    projectId: "minffort-woc-vendor",
    storageBucket: "minffort-woc-vendor.appspot.com",
    messagingSenderId: "981907816915",
    appId: "1:981907816915:web:55af6abe5cc5489b9aef26"
  };

let app1 = initializeApp(firebaseConfig1, "customer");
let app2 = initializeApp(firebaseConfig2, "vendor");

let auth1 = getAuth(app1);
let auth2 = getAuth(app2);


// FOR CUSTOMER


// Sign Up

let cSignInForm = document.getElementById('customer_signup');

cSignInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let email = document.getElementById('customer_signup_email').value;
    let password = document.getElementById('customer_signup_password').value;
    let confirm_password = document.getElementById('customer_signup_confirm_password').value;

    if (password == confirm_password) {
        createUserWithEmailAndPassword(auth1, email, password)
            .then((cred) => {
                console.log("User Created: ", cred.user);
                // cSignInForm.reset();
            })
            .catch((err) => {
                console.log(err.code);
                console.log(err.message);
            })
    }
    else {
        alert("Passwords do not match!!");
    }

})

// Sign In

let cLogInForm = document.getElementById('customer_logInForm');

cLogInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let c_signin_email = document.getElementById('customer_email').value;
    let c_signin_password = document.getElementById('customer_password').value;

    signInWithEmailAndPassword(auth1, c_signin_email, c_signin_password)
        .then((cred) => {
            console.log('User logged in: ', cred.user);
        })
        .catch((err) => {
            console.log(err.code);
            console.log(err.message);
        })

})



//FOR VENDORS

let vSignInForm = document.getElementById('vendor_signup');

vSignInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let v_email = document.getElementById('vendor_signup_email').value;
    let v_password = document.getElementById('vendor_signup_password').value;
    let v_confirm_password = document.getElementById('vendor_signup_confirm_password').value;

    if (v_password == v_confirm_password) {
        createUserWithEmailAndPassword(auth2, v_email, v_password)
            .then((cred) => {
                console.log("User Created: ", cred.user);
                // cSignInForm.reset();
            })
            .catch((err) => {
                console.log(err.code);
                console.log(err.message);
            })
    }
    else {
        alert("Passwords do not match!!");
    }

})

// Sign In

let vLogInForm = document.getElementById('vendor_logInForm');

vLogInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let v_signin_email = document.getElementById('vendor_email').value;
    let v_signin_password = document.getElementById('vendor_password').value;

    signInWithEmailAndPassword(auth2, v_signin_email, v_signin_password)
        .then((cred) => {
            console.log('User logged in: ', cred.user);
            window.location.replace("vendor-signup-form.html");

        })
        .catch((err) => {
            console.log(err.code);
            console.log(err.message);
        })

})


// Redirecting to different page

onAuthStateChanged(auth2, (user) => {
    if(user){
        window.location.replace("vendor-signup-form.html");
    }
    else{
        console.log("User Signed out");
    }
})