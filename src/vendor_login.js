import { initializeApp } from "firebase/app";

import {
    getFirestore,
    doc,
    getDoc,
    updateDoc,
    deleteDoc
} from 'firebase/firestore'

import {
    getAuth,
    onAuthStateChanged,
    signOut,
    deleteUser
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

let db = getFirestore(app);

let auth = getAuth(app);

// Form Traversal
let edit_canteen_form = document.getElementById('edit_canteen_form');
let edit_menu = document.getElementById('edit_menu');

let edit_canteen_form_btn = document.getElementById('edit_canteen_form_btn');
let edit_menu_form_btn = document.getElementById('edit_menu_form_btn');

let _1 = document.getElementById('_1');
let _2 = document.getElementById('_2');

edit_canteen_form_btn.addEventListener('click', (e) => {
    e.preventDefault();

    edit_canteen_form.style.display = "block";
    _1.style.display = "block";

    edit_menu.style.display = "none";
    _2.style.display = "none";
})
edit_menu_form_btn.addEventListener('click', (e) => {
    e.preventDefault();

    edit_canteen_form.style.display = "none";
    _1.style.display = "none";


    edit_menu.style.display = "block";
    _2.style.display = "block";
})



let shopName = document.querySelector('#shopName');
let ownerName = document.querySelector('#ownerName');
let phoneNo = document.querySelector('#phoneNo');
let address = document.querySelector('#address');
let about = document.querySelector('#about');
let s = document.getElementsByName('s');
let pfp = document.getElementById('pfp');


onAuthStateChanged(auth, async (user) => {
    if (user) {

        let email = user.email;
        let st;

        let docRef = doc(db, 'Canteen', email);

        await getDoc(docRef)
            .then((doc) => {

                let ob = doc.data().data;

                pfp.src = doc.data().ImgURL;

                shopName.value = ob.shopName;
                ownerName.value = ob.ownerName;
                phoneNo.value = ob.phoneNo;
                address.value = ob.address;
                about.value = ob.about;

                if (ob.status === false) {
                    s[0].checked = true;
                }
                else {
                    s[1].checked = true;
                }
            })
            .catch((err) => {
                console.log(err.message);
                if (err.message == "doc.data() is undefined") {
                    console.log("Canteen for this account does not exists");
                }
            })

        // retriving menu items

        let menu_docRef = doc(db, 'Menu System', email);

        let menu_list_retrive = [];

        await getDoc(menu_docRef)
            .then((doc) => {
                //appending menu items to array
                for (const key in doc.data()) {
                    if (key != "sample") {
                        menu_list_retrive.push(doc.data()[key]);
                    }
                }
            })
            .catch((e) => {
                console.log(e.code);
                console.log("No menu item");
            })


        let menu_system = document.getElementById('menu_system');

        //making form for each menu item and appending in menu_system
        let i = 0;
        menu_list_retrive.forEach((menu_item) => {

            let input_row = document.createElement('div');
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

            let new_availabiltySpan = `<span class="availabilitySpan">
            Availability
            <label>
                <input type="radio" name="${i}" class="ava" value=false>
                <div class="ava_design"></div> 
                <div class="ava_text">Not Available</div>
            </label>
            <label>
                <input type="radio" name="${i}" class="ava" value=true>
                <div class="ava_design"></div> 
                <div class="ava_text">Available</div>
            </label>
        </span>`;

            input_row.innerHTML += new_availabiltySpan;


            // Putting values of items inside Input
            let item_names = Array.from(document.getElementsByClassName('item_name'));
            let item_prices = Array.from(document.getElementsByClassName('item_price'));

            for(let j = 0; j<item_names.length; j++){
                if(j == i){
                    item_names[j].value = menu_item.commodity;
                    item_prices[j].value = menu_item.price;
                }
            }


            let item_availability = menu_item.availability;
            let radio_check = document.getElementsByName(i);

            if (item_availability == true) {
                radio_check[1].checked = true;
            }
            if (item_availability == false) {
                radio_check[0].checked = true;
            }
            i++;
        })

        //--------------------------Menu System ( Temporary )-------------------------------------------
        // adding new item fields
        let add_item = document.getElementById('add_item');
        add_item.addEventListener('click', (e) => {
            e.preventDefault();

            let input_row = document.createElement('div');
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

            let new_availabiltySpan = `<span class="availabilitySpan">
                    Availability
                    <label>
                        <input type="radio" name="${i}" class="ava" value=false>
                        <div class="ava_design"></div> 
                        <div class="ava_text">Not Available</div>
                    </label>
                    <label>
                        <input type="radio" name="${i}" class="ava" value=true>
                        <div class="ava_design"></div> 
                        <div class="ava_text">Available</div>
                    </label>
                </span>`;

            input_row.innerHTML += new_availabiltySpan;
            i++;
        })


        let submitForm = document.querySelector('#submitForm');

        submitForm.addEventListener('click', (e) => {
            e.preventDefault();

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

            updateDoc(docRef, { data })
                .then(() => {
                    console.log("Changes saved");
                })

            // appending changes in menu
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
                if (availability_item[1].checked) {
                    availability_list[index] = true;
                }
                if (availability_item[0].checked) {
                    availability_list[index] = false;
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

            ob_array.forEach((ob) => {
                let push_ob = {};
                push_ob[ob.commodity] = ob;

                updateDoc(menu_docRef, push_ob);
            })
        });

        // Deleting Account

        let delbtn_modal = document.getElementById('delbtn_modal');

        delbtn_modal.addEventListener('click', (e) => {

            let delModal = document.getElementById('delModal');
            delModal.classList.toggle('active');

        })

        let closeBTN = document.getElementById('closeBTN');

        closeBTN.addEventListener('click', (e) => {
            e.preventDefault();
            delModal.classList.toggle('active');
        })


        let delBTN = document.getElementById("delBTN");
        delBTN.addEventListener('click', () => {
            let vendor = auth.currentUser;

            deleteUser(vendor)
                .then(async () => {
                    let delDoc = doc(db, "Canteen", email);
                    let delCom = doc(db, "Comment System", email);
                    let delMen = doc(db, "Menu System", email);
                    let delVot = doc(db, "Voting System", email);
                    await getDoc(delDoc)
                        .then(async () => {
                            await deleteDoc(delDoc);
                            await deleteDoc(delCom);
                            await deleteDoc(delMen);
                            await deleteDoc(delVot);
                            console.log("Deleted Account");
                            window.location.replace('index.html');
                        })
                        .catch((err) => {
                            console.log(err.code);
                        })
                })
                .catch((err) => {
                    console.log(err.code);
                })
        })


    }
});

// Log Out
let log_out = document.getElementById('logout');

log_out.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log("User logged out");

            window.location.replace("index.html");
        })
        .catch((err) => {
            console.log(err.message);
            console.log(err.code);
        })
});
