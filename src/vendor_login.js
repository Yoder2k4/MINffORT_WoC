import { initializeApp } from "firebase/app";

import {
    getFirestore,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    deleteField
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
let response_box = document.getElementById('check_response');

let edit_canteen_form_btn = document.getElementById('edit_canteen_form_btn');
let edit_menu_form_btn = document.getElementById('edit_menu_form_btn');
let check_response_btn = document.getElementById('check_response_btn');

let _1 = document.getElementById('_1');
let _2 = document.getElementById('_2');
let _3 = document.getElementById('_3');

edit_canteen_form_btn.addEventListener('click', (e) => {
    e.preventDefault();

    edit_canteen_form.style.display = "block";
    _1.style.display = "block";

    edit_menu.style.display = "none";
    _2.style.display = "none";

    response_box.style.display = "none";
    _3.style.display = "none";
})
edit_menu_form_btn.addEventListener('click', (e) => {
    e.preventDefault();

    edit_canteen_form.style.display = "none";
    _1.style.display = "none";


    edit_menu.style.display = "block";
    _2.style.display = "block";

    response_box.style.display = "none";
    _3.style.display = "none";
})
check_response_btn.addEventListener('click', (e) => {
    e.preventDefault();

    edit_canteen_form.style.display = "none";
    _1.style.display = "none";


    edit_menu.style.display = "none";
    _2.style.display = "none";

    response_box.style.display = "block";
    _3.style.display = "block";
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
        
        let notify_c = [];
        let previous_status;
        let after_status;
        
        await getDoc(docRef)
            .then((doc) => {

                if(doc.data().c_addresses != undefined){
                    for (const key in doc.data().c_addresses) {
                        if (doc.data().c_addresses.hasOwnProperty(key)) {
                            notify_c.push(doc.data().c_addresses[key]);
                        }
                    }
                }

                console.log(notify_c);

                pfp.src = doc.data().ImgURL;
                
                let ob = doc.data().data;

                shopName.value = ob.shopName;
                ownerName.value = ob.ownerName;
                phoneNo.value = ob.phoneNo;
                address.value = ob.address;
                about.value = ob.about;

                if (ob.status === false) {
                    s[0].checked = true;
                    previous_status = false;
                }
                else {
                    s[1].checked = true;
                    previous_status = true;
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
            item_name_input.setAttribute('readonly', 'readonly');
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

                    let del_menu_db = doc(db, 'Menu System', email);

                    let del_input_row = del_menu.parentElement.parentElement;

                    let commodity_name = del_input_row.children[0].children[1].value;

                    updateDoc(del_menu_db, {
                        [`${commodity_name}`]: deleteField()
                    })
                        .then(() => {
                            console.log("Delete menu item");
                        })
                        .catch((e) => {
                            console.log(e.code);
                        })

                    del_input_row.remove();
                })
            })

            // Putting values of items inside Input
            let item_name = input_row.children[0].children[1];
            let item_price = input_row.children[1].children[1];
            item_name.value = menu_item.commodity;
            item_price.value = menu_item.price;

            let item_availability = menu_item.availability;
            let radio_check = document.getElementsByName(i);

            if (item_availability == true) {
                radio_check[1].checked = true;
            }
            if (item_availability == false) {
                radio_check[0].checked = true;
            }
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
            item_name_input.setAttribute('onkeypress', 'return blockSpecialChar(event)');
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
            item_price_input.setAttribute('onkeypress', 'return blockAllChar(event)');
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

                    let del_menu_db = doc(db, 'Menu System', email);

                    let del_input_row = del_menu.parentElement.parentElement;

                    let commodity_name = del_input_row.children[0].children[1].value;

                    del_input_row.remove();

                    if(commodity_name != "") {
                        updateDoc(del_menu_db, {
                            [`${commodity_name}`]: deleteField()
                        })
                            .then(() => {
                                console.log("Delete menu item");
                            })
                            .catch((e) => {
                                console.log(e.code);
                            })
                    }
                })
            })
        })

        // Check Customer Response


// --------------------------------------------------------------------------------------------------------
        // VOTING SYSTEM

        let vot_docRef = doc(db, 'Voting System', email);

        await getDoc(vot_docRef)
            .then((snapshot) => {
                let vendor_result = [];
                // Fetching vote data
                for (const key in snapshot.data()) {
                    if (snapshot.data().hasOwnProperty(key)) {
                        vendor_result.push(snapshot.data()[key].vote);
                    }
                }

                // Calculating Net Vote
                let result = 0;
                for (let i = 0; i < vendor_result.length; i++) {
                    if (vendor_result[i] === true) {
                        result += 1;
                    }
                    if (vendor_result[i] === false) {
                        result -= 1;
                    }
                }
                let vote_count = document.querySelector('#vote_count');
                vote_count.innerText = result;
            })

// ------------------------------------------------------------------------------------------------------
        // COMMENT SYSTEM

        let com_docRef = doc(db, 'Comment System', email);
        // Fetching comments
        let vendor_comments = [];
        await getDoc(com_docRef)
            .then((snapshot) => {
                for (const key in snapshot.data()) {
                    if (snapshot.data().hasOwnProperty(key)) {
                        vendor_comments.push(snapshot.data()[key]);
                    }
                }
            })
        
            
        vendor_comments.sort(function (a, b) { return b.createdAt - a.createdAt });

        let collection_box = document.getElementsByClassName('collection')[0];

        vendor_comments.forEach((c) => {

            let collection_item = document.createElement('li');
            collection_item.classList.add('collection-item');
            collection_item.classList.add('avatar');
            collection_box.appendChild(collection_item);

            let i_person = document.createElement('i');
            i_person.classList.add('material-icons');
            i_person.classList.add('circle');
            i_person.classList.add('cyan');
            i_person.innerText = "person";
            collection_item.appendChild(i_person);

            let comment_username = document.createElement('span');
            comment_username.classList.add('title');
            comment_username.classList.add('comment_username');
            comment_username.setAttribute('style', 'font-weight: bold;')
            comment_username.innerText = c.username;
            collection_item.appendChild(comment_username);


            let comment_time = document.createElement('p');
            comment_time.classList.add('comment_time');
            let createdAt = c.createdAt;
            comment_time.innerHTML = createdAt.toDate().toDateString() + '\t' + createdAt.toDate().toLocaleTimeString() + '<br>';
            collection_item.appendChild(comment_time);

            let comment_line = document.createElement('p');
            comment_line.classList.add('comment_line');
            comment_line.innerText = c.comment;
            collection_item.appendChild(comment_line);

        })


// -------------------------------------------------------------------------------------------------------
        // Submiting Form

        let submitForm = document.querySelector('#submitForm');

        submitForm.addEventListener('click', async (e) => {
            e.preventDefault();

            if (s[0].checked) {
                st = false;
                after_status = false;
            }
            if (s[1].checked) {
                st = true;
                after_status = true;
            }
            let data = {
                shopName: shopName.value,
                ownerName: ownerName.value,
                phoneNo: phoneNo.value,
                address: address.value,
                about: about.value,
                status: st
            };

            await updateDoc(docRef, { data })
                .then(() => {
                    console.log("Changes saved");
                    let alertMSG = document.getElementById('alertMSG');
                    alertMSG.classList.add('show');

                    setTimeout(() => {
                        alertMSG.classList.remove('show');
                    }, 3000);
                })


            // SMS Notification System
            if(previous_status == false && after_status == true){
                for(let i = 0; i < notify_c.length; i++){
                    let email_subject = shopName.value + " is now open!";
                    let email_body = `<b>Dear ${notify_c[i]},</b>
                    <br>
                    <b>${shopName.value}  is open now!</b>
                    <br>
                    <b>Go grab your urgent necessity</b>
                    <br>
                    <b>With Regards,</b>
                    <br>
                    <b>Team MINffORT</b>`;
                    Email.send({
                        SecureToken : "e654578c-601b-48d4-a1d5-35bb69d8d0f7",
                        To : notify_c[i],
                        From : "sharma0701yash@gmail.com",
                        Subject : email_subject,
                        Body : email_body
                    }).then(() => {
                        console.log("Email sent");
                    });
                }
    
                await updateDoc(docRef, {
                    c_addresses : deleteField()
                })
                    .then(() => {
                        console.log("c_addresses deleted");
                    })
            }

            // appending changes in menu
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

//View Other Canteens
let view_other = document.getElementById("view_other");
view_other.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.replace('home_page.html');
})


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
