import { initializeApp } from 'firebase/app'

import {
    getFirestore,
    collection,
    onSnapshot,
    setDoc,
    doc
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

let email;
let img_url;

onAuthStateChanged(auth, (user) => {
    if (user) {
        let add = document.querySelector('#details');
        let submitForm = document.querySelector('#submitForm');

        submitForm.addEventListener('click', (e) => {
            e.preventDefault();
            email = user.email;

            let docRef = doc(db, "Canteen", email);

            // Fetching input values from Form
            let s = document.getElementsByName('s');
            let st;
            if(s[0].checked){
                st = false;
            }
            if(s[1].checked){
                st = true;
            }
            let data = {
                shopName: add.shopName.value,
                ownerName: add.ownerName.value,
                phoneNo: add.phoneNo.value,
                address: add.address.value,
                about: add.about.value,
                status: st
            };
            
            setDoc(docRef, { ImgURL: img_url, data });
        })
    }
    
})


// -------------------------Image Upload---------------------------------------

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from 'firebase/storage'


let reader = new FileReader();
// Lets users asynchronously read contents of file stored on user' pc 

let files = [];

let fileName;
let pfp = document.getElementById('pfp');
let selbtn = document.getElementById('selbtn');

let ip = document.createElement('input');
ip.type = 'file';

selbtn.addEventListener('click', (e) => {
    e.preventDefault();
    ip.click();
});

ip.addEventListener('change', (e) => {
    files = e.target.files;
    // e.target.files returns a FileList, files[0] returns an object containing data about image
    fileName = files[0].name;

    reader.readAsDataURL(files[0]);
});

reader.onload = async function(){
    pfp.src = reader.result;
    await UploadProcess();
}

async function UploadProcess(){
    let ImgToUpload = files[0];
    
    let metaData = {
        contentType: ImgToUpload.type
    };
    
    let storage = getStorage(app);
    
    let storageRef = ref(storage, "pfp/"+fileName);
    
    await uploadBytesResumable(storageRef, ImgToUpload, metaData)
        .then(async (snapshot) => {
            console.log("Uploading... ");
            console.log((snapshot.bytesTransferred/snapshot.totalBytes)*100, "%" );
            await getDownloadURL(snapshot.ref).then((downloadURL) => {
                img_url = downloadURL;
                console.log(downloadURL);
            })
        })
        .catch((err) => {
            console.log(err.code);
        })

};

//Sign Out
let sign_out = document.getElementById('signout');

sign_out.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            window.location.replace("index.html");
        })
        .catch((err) => {
            console.log(err.message);
            console.log(err.code);
        })
})
