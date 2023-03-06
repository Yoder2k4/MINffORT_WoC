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

let cSignUpForm = document.getElementById('customer_signup');
let c_signup_error = document.getElementById('c_signup_error');

cSignUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let email = document.getElementById('customer_signup_email').value;
    let password = document.getElementById('customer_signup_password').value;
    let confirm_password = document.getElementById('customer_signup_confirm_password').value;

    if (password == confirm_password) {
        createUserWithEmailAndPassword(auth1, email, password)
            .then((cred) => {
                console.log("User Created: ", cred.user);
                // cSignUpForm.reset();
            })
            .catch((err) => {
                console.log(err.code);
                console.log(err.message);
                if(err.code === "auth/invalid-email"){
                    c_signup_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Invalid Email ID. &nbsp; &nbsp; ( example@gmail.com )</span>";
                }
                if(err.code === "auth/weak-password"){
                    c_signup_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Weak Password. Password should be at least 6 characters</span>";
                }
                if(err.code === "auth/email-already-in-use"){
                    c_signup_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Email ID already in use. Please try different email address</span>";
                }
            })
    }
    else {
        c_signup_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Passwords do not match.</span>";
    }

})

// Sign In

let cLogInForm = document.getElementById('customer_logInForm');
let c_login_error = document.getElementById('c_login_error');

cLogInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let c_signin_email = document.getElementById('customer_email').value;
    let c_signin_password = document.getElementById('customer_password').value;

    signInWithEmailAndPassword(auth1, c_signin_email, c_signin_password)
        .then((cred) => {
            console.log('User logged in: ', cred.user);
            window.location.replace('home_page.html');
        })
        .catch((err) => {
            console.log(err.code);
            console.log(err.message);
            if(err.code === "auth/invalid-email"){
                c_login_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Invalid Email ID. &nbsp; &nbsp; ( example@gmail.com ) </span>";
            }
            if(err.code === "auth/user-not-found"){
                c_login_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>User address does not exist. Please make a New Account.</span>";
            }
            if(err.code === "auth/wrong-password"){
                c_login_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Wrong Email/Password. &nbsp; Please try again.</span>";
            }
            if(err.code === "auth/too-many-requests"){
                c_login_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; Too many failed attempts. Please try again later.";
            }
        })

})



//FOR VENDORS

let vSignUpForm = document.getElementById('vendor_signup');
let v_signup_error = document.getElementById('v_signup_error');

vSignUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let v_email = document.getElementById('vendor_signup_email').value;
    let v_password = document.getElementById('vendor_signup_password').value;
    let v_confirm_password = document.getElementById('vendor_signup_confirm_password').value;

    if (v_password == v_confirm_password) {
        createUserWithEmailAndPassword(auth2, v_email, v_password)
            .then((cred) => {
                console.log("User Created: ", cred.user);
                window.location.replace("vendor-signup-form.html")
            })
            .catch((err) => {
                console.log(err.code);
                console.log(err.message);
                if(err.code === "auth/invalid-email"){
                    v_signup_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Invalid Email ID. &nbsp; &nbsp; ( example@gmail.com )</span>";
                }
                if(err.code === "auth/weak-password"){
                    v_signup_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Weak Password. Password should be at least 6 characters</span>";
                }
                if(err.code === "auth/email-already-in-use"){
                    v_signup_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Email ID already in use. Please try different email address</span>";
                }
            })
    }
    else {
        v_signup_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Passwords do not match.</span>";
    }

})

// Sign In

let vLogInForm = document.getElementById('vendor_logInForm');
let v_login_error = document.getElementById('v_login_error');

vLogInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let v_signin_email = document.getElementById('vendor_email').value;
    let v_signin_password = document.getElementById('vendor_password').value;

    signInWithEmailAndPassword(auth2, v_signin_email, v_signin_password)
        .then((cred) => {
            console.log('User logged in: ', cred.user);
            window.location.replace("vendor-login-form.html");

        })
        .catch((err) => {
            console.log(err.code);
            console.log(err.message);
            if(err.code === "auth/invalid-email"){
                v_login_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Invalid Email ID. &nbsp; &nbsp; ( example@gmail.com ) </span>";
            }
            if(err.code === "auth/user-not-found"){
                v_login_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>User address does not exist. Please make a New Account.</span>";
            }
            if(err.code === "auth/wrong-password"){
                v_login_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Wrong Email/Password. &nbsp;&nbsp; Please try again.</span>";
            }
            if(err.code === "auth/too-many-requests"){
                v_login_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; Too many failed attempts. Please try again later.";
            }
        })

})



// Redirecting to different page

onAuthStateChanged(auth2, (user) => {
    if(user){
        window.location.replace("vendor-signup-form.html");
    }
    else{
        console.log("Vendor-login to index");
    }
})