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

        let canteens = [];
        
        onSnapshot(colRef, (snapshot) => {

            snapshot.docs.forEach((doc) => {
                canteens.push({...doc.data(), id: doc.id})
            })
            console.log(canteens);
            
            let container_remove = document.getElementById('card-container');
            container_remove.remove();

            let card_container = document.createElement('div');
            card_container.setAttribute('id','card-container');
            document.body.appendChild(card_container);
    
            canteens.forEach((canteen) => {
    
                // Fetching data from firestore
                let card_id = canteen.id;
                let v_name = canteen.data.shopName;
                let o_name = canteen.data.ownerName;
                let v_address = canteen.data.address;
                let v_about = canteen.data.about;
                let v_phone = canteen.data.phoneNo;
                let s = canteen.data.status;
                let v_status;
                if(s === true){
                    v_status = "OPEN";
                }else{
                    v_status = "CLOSE";
                }
                let img_src = canteen.ImgURL;
            
            
            
                // Card Overall
            
                let card_item = document.createElement('div');
                card_item.classList.add('card-item');
                card_item.classList.add('modal-trigger');
                card_item.classList.add('z-depth-2');
                card_item.setAttribute('href', '#' + card_id);
            
            
                // Image Container
            
                let image = document.createElement('div');
                image.classList.add('image');
                let img = document.createElement('img');
                img.src = img_src;
                image.appendChild(img);
            
            
            
                // Content Container
            
                let content = document.createElement('div');
                content.classList.add('content');
            
            
            
                // Vendor Name Box
            
                let vendor_name_box = document.createElement('div');
                vendor_name_box.classList.add('vendor_name_box');
                let vendor_name = document.createElement('span');
                vendor_name.classList.add('vendor_name');
                vendor_name.innerHTML = v_name;
                vendor_name_box.appendChild(vendor_name);
            
                content.appendChild(vendor_name_box);
            
            
            
                // Vendor Address Box
            
                let vendor_address_box = document.createElement('div');
                vendor_address_box.classList.add('vendor_address_box');
                let box_title_a = document.createElement('span');
                box_title_a.classList.add('box_title_a');
                let i_home = document.createElement('i');
                i_home.classList.add('material-icons');
                i_home.innerHTML = "home";
                box_title_a.appendChild(i_home);
                let address = document.createElement('span');
                address.classList.add('address');
                let address_innerTEXT = document.createElement('span');
                address_innerTEXT.innerHTML =  v_address;
                address.appendChild(address_innerTEXT);
                vendor_address_box.appendChild(box_title_a);
                vendor_address_box.appendChild(address);
            
                content.appendChild(vendor_address_box);
            
            
            
                // Vendor Description Box
            
                let vendor_description_box = document.createElement('div');
                vendor_description_box.classList.add('vendor_description_box');
                let box_title_d = document.createElement('span');
                box_title_d.classList.add('box_title_d');
                let i_description = document.createElement('i');
                i_description.classList.add('material-icons');
                i_description.innerHTML = "description";
                box_title_d.appendChild(i_description);
                let description = document.createElement('span');
                description.classList.add('description');
                let description_innerTEXT = document.createElement('span');
                description_innerTEXT.innerHTML =  v_about;
                description.appendChild(description_innerTEXT);
                vendor_description_box.appendChild(box_title_d);
                vendor_description_box.appendChild(description);
            
                content.appendChild(vendor_description_box);
            
            
                // Status Box
            
                let status_box = document.createElement('div');
                status_box.classList.add('status_box');
                let status = document.createElement('span');
                status.classList.add('status');
                status.innerHTML = "Status: ";
                let open_close = document.createElement('span');
                open_close.classList.add('open-close');
                open_close.innerHTML = v_status;
                if(v_status === "OPEN"){
                    open_close.style.color = "chartreuse";
                }
                if(v_status === "CLOSE"){
                    open_close.style.color = "red";
                }
                status_box.appendChild(status);
                status_box.appendChild(open_close);
                
                content.appendChild(status_box);
            
            
                // Phone Number Box
            
                let phoneNo_box = document.createElement('div');
                phoneNo_box.classList.add('phoneNo_box');
                let phone_label = document.createElement('span');
                phone_label.classList.add('phone_label');
                phone_label.innerHTML = "Phone No.";
                let phoneNo = document.createElement('span');
                phoneNo.classList.add('phoneNo');
                let i_phone = document.createElement('i');
                i_phone.classList.add('material-icons');
                i_phone.innerHTML = "call";
                phoneNo.appendChild(i_phone);
                let phone_innerTEXT = document.createElement('span');
                phone_innerTEXT.innerHTML = ' ' + v_phone;
                phoneNo.appendChild(phone_innerTEXT);
                phoneNo_box.appendChild(phone_label);
                phoneNo_box.appendChild(phoneNo);
            
                content.appendChild(phoneNo_box);
            
            
            
                
                card_item.appendChild(image);
                card_item.appendChild(content);
            
                card_container.appendChild(card_item);
            });

            let card_item = document.getElementsByClassName('card-item');

            console.log(card_item);

            // Array.from(card_item).forEach((item) => {
            //     item.addEventListener('click', () => {
                    
            //     });
            // });

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




