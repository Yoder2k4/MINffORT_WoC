import { initializeApp } from 'firebase/app'

import {
    getFirestore,
    updateDoc,
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



let email;
let img_url;

onAuthStateChanged(auth, (user) => {
    if (user) {
        let add = document.querySelector('#details');
        let submitForm = document.querySelector('#submitForm');

        // Adding info
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


            // Adding Menu
            
            let menu_docRef = doc(db, 'Menu System', email);
    
            let item_names = document.getElementsByClassName('item_name');
            let item_name_list = [];

            Array.from(item_names).forEach((item) => {
                item_name_list.push(item.value);
            })
            
            let item_prices = document.getElementsByClassName('item_price');
            let item_price_list = [];

            Array.from(item_prices).forEach((item) => {
                item_price_list.push(item.value);
            })

            let availability_list = [];
            let l = item_price_list.length;

            for (let index = 0; index < l; index++) {
                let availability_item = document.getElementsByName(index);
                if(availability_item[1].checked){
                    availability_list[index] = true;
                }
                if(availability_item[0].checked){
                    availability_list[index] =false;
                }
            }

            let ob_array = [];
            for (let index = 0; index < l; index++) {
                let object = {
                    commodity: item_name_list[index],
                    price: item_price_list[index],
                    availability: availability_list[index]
                }
                ob_array.push(object);
            }

            setDoc(menu_docRef, {
                sample: {
                    empty: "empty"
                }
            })

            ob_array.forEach((ob) => {
                let push_ob = {};
                push_ob[ob.commodity] = ob;

                updateDoc(menu_docRef, push_ob);
            })

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


//----------------------Menu System ( Temporary )--------------------------

// adding item fields
let add_item = document.getElementById('add_item')
let menu_system = document.getElementById('menu_system');
let i = 0;
add_item.addEventListener('click', (e) => {
    e.preventDefault();

    let input_row = document.createElement('div');
    input_row.setAttribute('class', 'input_row');
    menu_system.appendChild(input_row);

    let item_name = document.createElement('input');
    item_name.setAttribute('type', 'text');
    item_name.setAttribute('placeholder', 'Enter item name');
    item_name.setAttribute('class', 'item_name');
    input_row.appendChild(item_name);

    let item_price = document.createElement('input');
    item_price.setAttribute('type', 'text');
    item_price.setAttribute('placeholder', 'Enter price');
    item_price.setAttribute('class','item_price');
    input_row.appendChild(item_price);

    let p = document.createElement('p');
    input_row.appendChild(p);

    let check_ava = `Availability:
    <label>
        <input type="radio" name="${i}" class="not_available" value="false" required >
        <span>Not Available</span>
    </label>
    <label>
        <input type="radio" name="${i}" class="available" value="true" required >
        <span>Available</span>
    </label>`;
    p.innerHTML += check_ava;
    i++;
})






// --------------------------------------------------------------------
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
