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



// Form Traversal
let general_form = document.getElementById('general_form');
let upload_pfp_form = document.getElementById('upload_pfp_form');
let add_menu = document.getElementById('add_menu');

let general_form_btn = document.getElementById('general_form_btn');
let upload_pfp_form_btn = document.getElementById('upload_pfp_form_btn');
let add_menu_form_btn = document.getElementById('add_menu_form_btn');

let _1 = document.getElementById('_1');
let _2 = document.getElementById('_2');
let _3 = document.getElementById('_3');

general_form_btn.addEventListener('click', (e) => {
    e.preventDefault();

    general_form.style.display = "block";
    _1.style.display = "block";

    upload_pfp_form.style.display = "none";
    _2.style.display = "none";

    add_menu.style.display = "none";
    _3.style.display = "none";
})
upload_pfp_form_btn.addEventListener('click', (e) => {
    e.preventDefault();

    general_form.style.display = "none";
    _1.style.display = "none";

    upload_pfp_form.style.display = "block";
    _2.style.display = "block";

    add_menu.style.display = "none";
    _3.style.display = "none";
})
add_menu_form_btn.addEventListener('click', (e) => {
    e.preventDefault();

    general_form.style.display = "none";
    _1.style.display = "none";

    upload_pfp_form.style.display = "none";
    _2.style.display = "none";

    add_menu.style.display = "block";
    _3.style.display = "block";
})




let email;
let img_url;

onAuthStateChanged(auth, (user) => {
    if (user) {
        let submitForm = document.querySelector('#submitForm');
        let shopName = document.getElementById('shopName');
        let ownerName = document.getElementById('ownerName');
        let phoneNo = document.getElementById('phoneNo');
        let address = document.getElementById('address');
        let about = document.getElementById('about');

        // Adding info
        submitForm.addEventListener('click', async (e) => {
            e.preventDefault();
            email = user.email;

            let docRef = doc(db, "Canteen", email);

            // Fetching input values from Form
            let s = document.getElementsByName('s');
            let st;
            if (s[0].checked) {
                st = false;
            }
            if (s[1].checked) {
                st = true;
            }
            let data = {
                shopName: shopName.value,
                ownerName: ownerName.value,
                phoneNo: phoneNo.value,
                address: address.value,
                about: about.value,
                status: st
            };

            if(img_url == undefined){
                let alertMSG2 = document.getElementById('alertMSG2');
                alertMSG2.classList.add('show');
                setTimeout(() => {
                    alertMSG2.classList.remove('show');
                }, 4000);
            }
            else{
                await setDoc(docRef, { ImgURL: img_url, data });
            }

                


            // Adding Menu

            let menu_docRef = doc(db, 'Menu System', email);

            let input_row_list = Array.from(document.getElementsByClassName('input_row'));

            let commodity_value;
            let price_value;
            let availability_value;
            let ob_array = [];

            input_row_list.forEach((input_row_item) => {
                commodity_value = input_row_item.children[0].children[1].value;
                price_value = input_row_item.children[1].children[1].value;

                let not_available_input = input_row_item.children[2].children[0].children[0];

                if (not_available_input.checked) {
                    availability_value = false;
                }
                else {
                    availability_value = true;
                }

                let object = {
                    commodity: commodity_value,
                    price: price_value,
                    availability: availability_value
                }
                ob_array.push(object);
            });

            await setDoc(menu_docRef, {
                sample: {
                    empty: "empty"
                }
            })
                .then(() => {
                    let alertMSG = document.getElementById('alertMSG');
                    alertMSG.classList.add('show');

                    setTimeout(() => {
                        alertMSG.classList.remove('show');
                    }, 3000);
                })

            ob_array.forEach(async (ob) => {
                let push_ob = {};
                push_ob[ob.commodity] = ob;

                await updateDoc(menu_docRef, push_ob);
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
    let cloud = document.getElementById('cloud');
    cloud.style.display = "none";
    ip.click();
});

ip.addEventListener('change', (e) => {
    files = e.target.files;
    // e.target.files returns a FileList, files[0] returns an object containing data about image
    fileName = files[0].name;

    reader.readAsDataURL(files[0]);
});

reader.onload = async function () {
    pfp.src = reader.result;
    await UploadProcess();
}

async function UploadProcess() {
    let ImgToUpload = files[0];

    let metaData = {
        contentType: ImgToUpload.type
    };

    let storage = getStorage(app);

    let storageRef = ref(storage, "pfp/" + fileName);

    await uploadBytesResumable(storageRef, ImgToUpload, metaData)
        .then(async (snapshot) => {
            console.log("Uploading... ");
            console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100, "%");
            await getDownloadURL(snapshot.ref).then((downloadURL) => {
                img_url = downloadURL;
                console.log(downloadURL);
            })
        })
        .catch((err) => {
            console.log(err.code);
        })

};


// Menu System
let add_item = document.getElementById('add_item');
let menu_system = document.getElementById('menu_system');
add_item.addEventListener('click', (e) => {
    e.preventDefault();

    let input_row = document.createElement('input_row');
    input_row.classList.add('input_row');
    menu_system.appendChild(input_row);

    let commoditySpan = document.createElement('span');
    commoditySpan.classList.add('commoditySpan');
    input_row.appendChild(commoditySpan);

    let label_name = document.createElement('label');
    label_name.setAttribute('for', 'item_name');
    label_name.innerHTML = "Commodity <br>";
    commoditySpan.appendChild(label_name);

    let item_name_input = document.createElement('input');
    item_name_input.setAttribute('type', 'text');
    item_name_input.setAttribute('placeholder', '   Input');
    item_name_input.classList.add('item_name');
    commoditySpan.appendChild(item_name_input);

    let priceSpan = document.createElement('span');
    priceSpan.classList.add('priceSpan');
    input_row.appendChild(priceSpan);

    let label_price = document.createElement('label');
    label_price.setAttribute('for', 'item_name');
    label_price.innerHTML = "Price <br>";
    priceSpan.appendChild(label_price);

    let item_price_input = document.createElement('input');
    item_price_input.setAttribute('type', 'text');
    item_price_input.setAttribute('placeholder', '  Input');
    item_price_input.classList.add('item_price');
    priceSpan.appendChild(item_price_input);

    let i = Math.random();

    let new_availabiltySpan = `<span class="availabilitySpan">
            Availability
            <label>
                <input type="radio" name="${i}" class="ava" value=false>
                <div class="ava_design"></div> 
                <div class="ava_text">Unavailable</div>
            </label>
            <label>
                <input type="radio" name="${i}" class="ava" value=true>
                <div class="ava_design"></div> 
                <div class="ava_text">Available</div>
            </label>
        </span>`;
    input_row.innerHTML += new_availabiltySpan;

    let new_deleteSpan = `<span class="deleteSpan">
        <i class="material-icons del_menu_btns">delete</i>
    </span>`;
    input_row.innerHTML += new_deleteSpan;

    let del_menu_btns = Array.from(document.getElementsByClassName('del_menu_btns'));
    del_menu_btns.forEach((del_menu) => {
        del_menu.addEventListener('click', (e) => {
            e.preventDefault();

            let del_input_row = del_menu.parentElement.parentElement;
            del_input_row.remove();
        })
    })
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
