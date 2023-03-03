import { initializeApp } from 'firebase/app'

import {
    getFirestore,
    collection,
    onSnapshot,
    setDoc,
    doc
} from 'firebase/firestore'

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const firebaseConfig2 = {
    apiKey: "AIzaSyCySlvJttSd0wWiKuZ83CP_lRaUNQXTcdM",
    authDomain: "minffort-woc-vendor.firebaseapp.com",
    projectId: "minffort-woc-vendor",
    storageBucket: "minffort-woc-vendor.appspot.com",
    messagingSenderId: "981907816915",
    appId: "1:981907816915:web:55af6abe5cc5489b9aef26"
};

let app = initializeApp(firebaseConfig2, "vendor");
let auth = getAuth(app);
let db = getFirestore(app);



let colRef = collection(db, 'Canteen');

onSnapshot(colRef, (snapshot) => {
    let canteens = [];
    snapshot.docs.forEach((doc) => {
        canteens.push({ ...doc.data(), id: doc.id });
    })
    console.log(canteens);
})

let img_url;
let email;

onAuthStateChanged(auth, (user) => {
    if (user) {
        let add = document.querySelector('#details');
        
        add.addEventListener('submit', (e) => {
            e.preventDefault();
            
            email = user.email;
            let s = document.getElementsByName('s');
            let st;
            if(s[0].checked){
                st = (s[0].value != 'false');
            }
            if(s[1].checked){
                st = (s[1].value === 'true');
            }
            let data = {
                shopName: add.shopName.value,
                ownerName: add.ownerName.value,
                phoneNo: add.phoneNo.value,
                address: add.address.value,
                about: add.about.value,
                status: st,
                ImgURL: img_url
            };
            
            setDoc(doc(db, "Canteen", email), { data });
        })
    }
    
})


//Sign Out

let sign_out = document.getElementById('signout');

sign_out.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            // console.log("User logged out");
            
            window.location.replace("index.html");
        })
        .catch((err) => {
            console.log(err.message);
            console.log(err.code);
        })
})


// -------------------------Image Upload---------------------------------------

import {
    getStorage,
    ref as sRef,
    uploadBytesResumable,
    getDownloadURL
} from 'firebase/storage'


let files = [];
let reader = new FileReader();

let fileName;
let pfp = document.getElementById('pfp');
let selbtn = document.getElementById('selbtn');
let upbtn = document.getElementById('upbtn');

let ip = document.createElement('input');
ip.type = 'file';

selbtn.addEventListener('click', () => {
    ip.click();
});

ip.addEventListener('change', (e) => {
    files = e.target.files;
    fileName = files[0].name;
    // console.log(fileName);

    reader.readAsDataURL(files[0]);
});



async function UploadProcess(){
    let ImgToUpload = files[0];
    
    let metaData = {
        contentType: ImgToUpload.type
    };
    
    console.log("Working...");
    let storage = getStorage(app);
    
    let storageRef = sRef(storage, "pfp/"+fileName);
    
    let UploadTask = uploadBytesResumable(storageRef, ImgToUpload, metaData);
    
    UploadTask.on('state_changed', (snapshot) => {
        console.log("Uploading... ");
        console.log((snapshot.bytesTransferred/snapshot.totalBytes)*100, "%" );
    },
    (error) => {
        console.log("Error: Image not uploaded!!! ", error.message);
    },
    () => {
        getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
            img_url = downloadURL;
            console.log(downloadURL);
            // SaveURLtoFirestore(img_url);
        })
    }   
    )
};

reader.onload = function(){
    pfp.src = reader.result;
    UploadProcess;
}
// upbtn.onclick = UploadProcess;

// async function SaveURLtoFirestore(url){
    
//     let ref = doc(db, "Canteen/" , email);

//     await setDoc(ref,{
//         ImageName: (name+ext),
//         ImageURL: url
//     })
// }