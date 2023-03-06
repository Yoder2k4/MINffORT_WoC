import { initializeApp } from 'firebase/app'

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

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from 'firebase/auth'

let auth1 = getAuth(app1);


import {
    getFirestore,
    collection,
    onSnapshot,
    getDoc
} from 'firebase/firestore'


let db = getFirestore(app2);


onAuthStateChanged(auth1, (user) => {
    
    if(user){

        let colRef = collection(db, 'Canteen');

        onSnapshot(colRef, (snapshot) => {

            let canteens = [];
            snapshot.docs.forEach((doc) => {
                canteens.push({...doc.data(), id: doc.id})
            })
            console.log(canteens);

            canteens.forEach((canteen) => {

                let col = document.createElement("div");
                col.classList.add("col");
                col.classList.add("l4");

                let card = document.createElement('div');
                card.classList.add('card');
                col.appendChild(card);

                let card_image = document.createElement('div');
                card_image.classList.add('card-image');
                card.appendChild(card_image); 

                let img = document.createElement('img');
                img.src = canteen.ImgURL;
                card_image.appendChild(img);

                let card_content = document.createElement('div');
                card_content.classList.add('card-content');
                card.appendChild(card_content);

                let shopName = document.createElement('span');
                let ownerName = document.createElement('span');
                let phoneNo = document.createElement('span');
                let address = document.createElement('span');
                let about = document.createElement('span');
                let status = document.createElement('span');
                let br = document.createElement('br');

                shopName.classList.add('card-title');
                ownerName.classList.add('ownerName');
                phoneNo.classList.add('phoneNo');
                address.classList.add('address');
                about.classList.add('about');
                status.classList.add('status');

                shopName.innerHTML = canteen.data.shopName;
                ownerName.innerHTML = canteen.data.ownerName;
                phoneNo.innerHTML = canteen.data.phoneNo;
                address.innerHTML = canteen.data.address;
                about.innerHTML = canteen.data.about;
                if(canteen.data.status === true){
                    status.innerHTML = "Open";
                }
                else{
                    status.innerHTML = "Close";
                }

                card_content.appendChild(shopName);
                
                card_content.appendChild(ownerName);

                card_content.appendChild(phoneNo);
                
                card_content.appendChild(address);
                
                card_content.appendChild(about);
                
                card_content.appendChild(status);




                let row = document.querySelector('.row');
                row.appendChild(col);
            });


        })

    }

});

let sign_out = document.getElementById('signOut');

sign_out.addEventListener('click', () => {
    signOut(auth1)
        .then(() => {
            console.log("User Signed Out");
            window.location.replace('index.html');
        })
        .catch((err) => {
            console.log(err.message);
        })
});