import { initializeApp } from "firebase/app";

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

import { getAuth, onAuthStateChanged } from 'firebase/auth';

let auth1 = getAuth(app1);
let auth2 = getAuth(app2);

import {
    getFirestore,
    collection,
    doc,
    setDoc,
    updateDoc,
    serverTimestamp,
    onSnapshot,
    query,
    deleteField
} from 'firebase/firestore';

let db1 = getFirestore(app1);
let db2 = getFirestore(app2);


console.log("Firebase connected");



let details = document.querySelector('#details');

let com_colRef = collection(db2, 'Comment System');
let com_docRef = doc(db2,'Comment System', 'kanteen@gmail.com');



onSnapshot(com_colRef,(snapshot) => {


    // let comment_docs = [];
    let vendor_comments = [];
    let check = false;
    snapshot.docs.forEach((docum) => {
        // comment_docs.push({ ...docum.data(), id: docum.id })
        if(docum.id === 'kanteen@gmail.com'){
            check = true;
            // console.log(docum.data());
            
            // Fetching Comments
            
            for (const key in docum.data()){
                if(docum.data().hasOwnProperty(key)){
                    vendor_comments.push(docum.data()[key]);
                    // console.log(docum.data()[key]);
                }
            };
            console.log(vendor_comments);
            
        }
    });

    // Fetched Below

    // let comment_box_del = document.querySelector('.comment_box');
    // comment_box_del.remove();


    // let comment_box = document.createElement('div');
    // comment_box.classList.add('comment_box');
    // let heading = document.createElement('h3');
    // heading.innerHTML = "Comments: ";
    // comment_box.appendChild(heading);

    // vendor_comments.forEach((c) => {

    //     let userName = document.createElement('div');
    //     userName.classList.add('username');
    //     userName.setAttribute('style', 'font-weight: bold;');
    //     userName.innerHTML = c.username;

    //     let comment_line = document.createElement('div');
    //     comment_line.classList.add('comment');
    //     comment_line.innerHTML = c.comment + '<br>';

    //     comment_box.appendChild(userName);
    //     comment_box.appendChild(comment_line);
        
    // });

    // document.body.appendChild(comment_box);

    
    details.addEventListener('submit', (e) => {
        e.preventDefault();
        if(check){
            let map_name = 'comment' + details.username.value + details.comment.value;
            let comments = {};
            comments[map_name] = {
                username: details.username.value,
                comment : details.comment.value,
                createdAt : serverTimestamp()
            };
            console.log("working");
            updateDoc(com_docRef, comments);
            console.log("Added more comments");
        }else{
            let map_name = 'comment' + details.username.value + details.comment.value;
            let comments = {};
            comments[map_name] = {
                username: details.username.value,
                comment : details.comment.value,
                createdAt : serverTimestamp()
            };
            setDoc(com_docRef, comments);
            console.log("Started adding comments");
        }
    });

});


// -----------------------------Voting System-----------------------------

let vot_colRef = collection(db2, 'Voting System');
let vot_docRef = doc(db2, 'Voting System', 'kanteen@gmail.com');
onSnapshot(vot_colRef, (snapshot) => {

    let check = false;
    let vendor_result = [];
    // let voteSnap = [];
    snapshot.docs.forEach((docum) => {
        if(docum.id === "kanteen@gmail.com"){
            check = true;
            for (const key in docum.data()){
                if(docum.data().hasOwnProperty(key)){
                    vendor_result.push(docum.data()[key].vote);
                    // console.log(docum.data()[key]);
                }
            };
            console.log(vendor_result);
        }
        // voteSnap.push({ ...docum.data(), id : docum.id});
    });

    let result = 0;
    let i = 0;
    for(i = 0; i<vendor_result.length; i++){
        if(vendor_result[i]===true){
            result+=1;
        }
        if(vendor_result[i]===false){
            result-=1;
        }
    }


    console.log(result);

    let netVote = document.getElementById('netVote');
    netVote.innerHTML = result


    // console.log(voteSnap);
    console.log(check);

    let upvote = document.getElementById('upvote');
    let novote = document.getElementById('novote');
    let downvote = document.getElementById('downvote');

    upvote.addEventListener('click', (e) => {
        // e.preventDefault();

        
        if(check === true){
            let user = 'vote' + 'yoder1';
            let vote_ob = {};
            
            vote_ob[user] = {
                vote : true
            };
            
            updateDoc(vot_docRef, vote_ob);
            console.log("Upvoted & updated");
            
        }else{
            let user = 'vote' + 'yoder1';
            let vote_ob = {};
            
            vote_ob[user] = {
                vote : true
            };

            setDoc(vot_docRef, vote_ob);
            console.log("Created & upvoted");

        }

    })
    novote.addEventListener('click', (e) => {
        // e.preventDefault();

        
        if(check === true){
            let user = 'vote' + 'yoder1';
            let vote_ob = {};

            vote_ob[user] = {
                vote : deleteField()
            };
            
            updateDoc(vot_docRef, {
                [`${user}.vote`] : deleteField()
            });
            console.log("Deleted & updated");
            
        }

    })
    downvote.addEventListener('click', (e) => {
        // e.preventDefault();

        
        if(check){
            
            let user = 'vote' + 'yoder1';
            let vote_ob = {};
            
            vote_ob[user] = {
                vote : false
            };
            updateDoc(vot_docRef, vote_ob);
            console.log("Downvoted & updated");
            
        }else{
            let user = 'vote' + 'yoder1';
            let vote_ob = {};
            
            vote_ob[user] = {
                vote : false
            };

            setDoc(vot_docRef, vote_ob);
            console.log("Created & downvoted");

        }

    })

});