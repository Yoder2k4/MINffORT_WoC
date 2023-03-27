import { initializeApp } from 'firebase/app'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
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
    // browser default behaviour is to submit the form directly to the URL provided(and if not provided, submits it to the same page only), without letting any other processing part been processed

    let email = document.getElementById('customer_signup_email').value;
    let password = document.getElementById('customer_signup_password').value;
    let confirm_password = document.getElementById('customer_signup_confirm_password').value;

    if (password == confirm_password) {
        createUserWithEmailAndPassword(auth1, email, password)
            .then((cred) => {
                window.location.replace('home_page.html');
                console.log("User Created: ", cred.user);
            })
            .catch((err) => {
                console.log(err.code);
                console.log(err.message);
                if (err.code === "auth/invalid-email") {
                    c_signup_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Invalid Email ID. &nbsp; &nbsp; ( example@gmail.com )</span>";
                }
                if (err.code === "auth/weak-password") {
                    c_signup_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Weak Password. Password should be at least 6 characters</span>";
                }
                if (err.code === "auth/email-already-in-use") {
                    c_signup_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Email ID already in use. Please try different email address</span>";
                }

            })
    }
    else {
        c_signup_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Passwords do not match.</span>";
    }
    setTimeout(() => {
        c_signup_error.innerHTML = "";
    }, 4000);
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
            window.location.replace('home_page.html');
            console.log('User logged in: ', cred.user);
        })
        .catch((err) => {
            console.log(err.code);
            console.log(err.message);
            if (err.code === "auth/invalid-email") {
                c_login_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Invalid Email ID. &nbsp; &nbsp; ( example@gmail.com ) </span>";
            }
            if (err.code === "auth/user-not-found") {
                c_login_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>User address does not exist. Please make a New Account.</span>";
            }
            if (err.code === "auth/wrong-password") {
                c_login_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Wrong Email/Password. &nbsp; Please try again.</span>";
            }
            if (err.code === "auth/too-many-requests") {
                c_login_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; Too many failed attempts. Please try again later.";
            }
        })

    setTimeout(() => {
        c_login_error.innerHTML = "";
    }, 4000);
})

// Forgot Password
let c_reset_button = document.getElementById('c_reset_button');
c_reset_button.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Reset Button Working");
    let customer_forgot_email = document.getElementById('customer_forgot_email').value;

    sendPasswordResetEmail(auth1, customer_forgot_email)
        .then(() => {
            let c_message = document.getElementById('c_message');
            c_message.innerText = "Password Reset Link sent to your Email";
            console.log("Password Reset Link sent to your Email");
        })
        .catch((err) => {
            console.log(err.code);
        })
})

//FOR VENDORS


// Sign Up
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
                if (err.code === "auth/invalid-email") {
                    v_signup_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Invalid Email ID. &nbsp; &nbsp; ( example@gmail.com )</span>";
                }
                if (err.code === "auth/weak-password") {
                    v_signup_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Weak Password. Password should be at least 6 characters</span>";
                }
                if (err.code === "auth/email-already-in-use") {
                    v_signup_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Email ID already in use. Please try different email address</span>";
                }
            })
    }
    else {
        v_signup_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Passwords do not match.</span>";
    }
    setTimeout(() => {
        v_signup_error.innerHTML = "";
    }, 4000);
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
            if (err.code === "auth/invalid-email") {
                v_login_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Invalid Email ID. &nbsp; &nbsp; ( example@gmail.com ) </span>";
            }
            if (err.code === "auth/user-not-found") {
                v_login_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>User address does not exist. Please make a New Account.</span>";
            }
            if (err.code === "auth/wrong-password") {
                v_login_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; <span>Wrong Email/Password. &nbsp;&nbsp; Please try again.</span>";
            }
            if (err.code === "auth/too-many-requests") {
                v_login_error.innerHTML = "<i class='material-icons' id='cancel'>cancel</i> &nbsp; Too many failed attempts. Please try again later.";
            }
        })
    setTimeout(() => {
        v_login_error.innerHTML = "";
    }, 4000);
})

// Forgot Password
let v_reset_button = document.getElementById('v_reset_button');
v_reset_button.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Reset Button Working");
    let vendor_forgot_email = document.getElementById('vendor_forgot_email').value;

    sendPasswordResetEmail(auth2, vendor_forgot_email)
        .then(() => {
            let v_message = document.getElementById('v_message');
            v_message.innerText = "Password Reset Link sent to your Email";
            console.log("Password Reset Link sent to your Email");
        })
        .catch((err) => {
            console.log(err.code);
        })
})
