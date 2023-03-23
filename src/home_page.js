import { initializeApp } from 'firebase/app'

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from 'firebase/auth'

import {
    getFirestore,
    collection,
    doc,
    setDoc,
    updateDoc,
    onSnapshot,
    deleteField,
    getDocs,
    serverTimestamp,
} from 'firebase/firestore'

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

let db2 = getFirestore(app2);



onAuthStateChanged(auth1, (user) => {

    // If user is authenticated
    if (user) {

        let customer_email = user.email;
        let colRef = collection(db2, 'Canteen');
        
        let signed_in_msg = document.getElementById('signed_in_msg');
        signed_in_msg.innerText = "Signed In as " + customer_email;
        
        // Whenever any data changes
        onSnapshot(colRef, (snapshot) => {
            
            let canteens = [];
             
            snapshot.docs.forEach((doc) => {
                canteens.push({ ...doc.data(), id: doc.id })
            })
                
            // Remove the container ( to refresh page after each snapshot )
            let card_container_remove = document.getElementById('card-container');
            card_container_remove.remove();

            // Draw new container
            let card_container = document.createElement('div');
            card_container.setAttribute('id', 'card-container');

            let content_body = document.getElementById('content_body');
            content_body.appendChild(card_container);


            // Draw card for each canteen
            canteens.forEach((canteen) => {

                // Fetching data from firestore
                let card_id = canteen.id;
                let v_name = canteen.data.shopName;
                let v_address = canteen.data.address;
                let v_about = canteen.data.about;
                let v_phone = canteen.data.phoneNo;
                let s = canteen.data.status;
                let v_status;
                if (s === true) {
                    v_status = "OPEN";
                } else {
                    v_status = "CLOSE";
                }
                let img_src = canteen.ImgURL;


                // Card Overall
                let card_item = document.createElement('div');
                card_item.classList.add('card-item');
                card_item.setAttribute('id', card_id);


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
                vendor_name.innerText = v_name;
                vendor_name_box.appendChild(vendor_name);

                content.appendChild(vendor_name_box);



                // Vendor Address Box
                let vendor_address_box = document.createElement('div');
                vendor_address_box.classList.add('vendor_address_box');
                let box_title_a = document.createElement('span');
                box_title_a.classList.add('box_title_a');
                let i_home = document.createElement('i');
                i_home.classList.add('material-icons');
                i_home.innerText = "home";
                box_title_a.appendChild(i_home);
                let address = document.createElement('span');
                address.classList.add('address');
                let address_inside_text = document.createElement('span');
                address_inside_text.innerText = v_address;
                address.appendChild(address_inside_text);
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
                i_description.innerText = "description";
                box_title_d.appendChild(i_description);
                let description = document.createElement('span');
                description.classList.add('description');
                let description_inside_text = document.createElement('span');
                description_inside_text.innerText = v_about;
                description.appendChild(description_inside_text);
                vendor_description_box.appendChild(box_title_d);
                vendor_description_box.appendChild(description);

                content.appendChild(vendor_description_box);


                // Status_side_text

                let status_box = document.createElement('div');
                status_box.classList.add('status_box');
                let status = document.createElement('span');
                status.classList.add('status');
                status.innerText = "Status: ";
                let open_close = document.createElement('span');
                open_close.classList.add('open-close');
                open_close.innerText = v_status;
                if (v_status === "OPEN") {
                    open_close.style.color = "rgb(54, 195, 25)";
                }
                if (v_status === "CLOSE") {
                    open_close.style.color = "red";
                }
                status_box.appendChild(status);
                status_box.appendChild(open_close);

                content.appendChild(status_box);


                // Phone Number Box

                let phoneNo_box = document.createElement('div');
                phoneNo_box.classList.add('phoneNo_box');
                let phoneNo = document.createElement('span');
                phoneNo.classList.add('phoneNo');
                let i_phone = document.createElement('i');
                i_phone.classList.add('material-icons');
                i_phone.innerText = "call";
                phoneNo.appendChild(i_phone);
                let phone_inside_text = document.createElement('span');
                phone_inside_text.innerText = ' ' + v_phone;

                phoneNo.appendChild(phone_inside_text);
                phoneNo_box.appendChild(phoneNo);
                content.appendChild(phoneNo_box);

                card_item.appendChild(image);
                card_item.appendChild(content);


                // Appending every value to Card Container
                card_container.appendChild(card_item);
            });

            let s = Array.from(document.getElementsByClassName('status_input'));
            for(let i = 0; i < s.length; i++){
                s[i].checked = false;
            }

            let card_item = document.getElementsByClassName('card-item');

            Array.from(card_item).forEach((item) => {

                // to make modal structure and toggle canteen info
                item.addEventListener('click', () => {


                    let card_select = document.createElement('div');
                    card_select.classList.add('card_select');
                    card_select.setAttribute('id', 'popup');


                    let image_container = document.createElement('div');
                    image_container.classList.add('image_container');

                    let image = document.createElement('img');
                    image_container.appendChild(image);
                    card_select.appendChild(image_container);

                    let card_select_content = document.createElement('div');
                    card_select_content.classList.add('card_select_content');
                    card_select.appendChild(card_select_content);

                    // Close Button 
                    let cross_btn = document.createElement('span');
                    cross_btn.classList.add('cross_btn');

                    let close_icon = document.createElement('i');
                    close_icon.classList.add('material-icons');
                    close_icon.setAttribute('id', 'closeBTN');
                    close_icon.innerText = "close";
                    cross_btn.appendChild(close_icon);
                    card_select_content.appendChild(cross_btn);

                    let shopName_box = document.createElement('div');
                    shopName_box.classList.add('shopName_box');
                    card_select_content.appendChild(shopName_box);

                    let shopName_title = document.createElement('span');
                    shopName_title.classList.add('shopName_title');
                    shopName_box.appendChild(shopName_title);

                    let side = document.createElement('span');
                    side.classList.add('side');
                    shopName_box.appendChild(side);

                    let phone_side = document.createElement('span');
                    phone_side.classList.add('phone_side');

                    let call_icon = document.createElement('i');
                    call_icon.classList.add('material-icons');
                    call_icon.innerText = "call";

                    let phoneNo_inside_text = document.createElement('span');
                    phone_side.appendChild(call_icon);
                    phone_side.appendChild(phoneNo_inside_text);
                    side.appendChild(phone_side);

                    let ownerName_side = document.createElement('span');
                    ownerName_side.classList.add('ownerName_side');

                    let ownerName = document.createElement('span');
                    ownerName.classList.add('ownerName');
                    ownerName_side.appendChild(ownerName);
                    side.appendChild(ownerName_side);

                    let info_box = document.createElement('div');
                    info_box.classList.add('info_box');
                    card_select_content.appendChild(info_box);

                    let vote_box = document.createElement('div');
                    vote_box.classList.add('vote_box');
                    info_box.appendChild(vote_box);

                    let vote_item = document.createElement('span');
                    vote_item.classList.add('vote_item');
                    vote_box.appendChild(vote_item);

                    let arrow_up = document.createElement('i');
                    arrow_up.classList.add('material-icons');
                    arrow_up.setAttribute('id', 'arrow_up');
                    arrow_up.innerText = "arrow_drop_up";
                    vote_item.appendChild(arrow_up);

                    let voteCount = document.createElement('span');
                    voteCount.classList.add('voteCount');
                    vote_item.appendChild(voteCount);

                    let arrow_down = document.createElement('i');
                    arrow_down.classList.add('material-icons');
                    arrow_down.setAttribute('id', 'arrow_down');
                    arrow_down.innerText = "arrow_drop_down";
                    vote_item.appendChild(arrow_down);


                    let status_container = document.createElement('div');
                    status_container.classList.add('status_container');
                    info_box.appendChild(status_container);

                    let status_inbox = document.createElement('span');
                    status_inbox.classList.add('status_inbox');
                    status_inbox.innerText = "Status: ";

                    let status_line = document.createElement('span');
                    status_line.classList.add('status_line');
                    status_inbox.appendChild(status_line);
                    status_container.appendChild(status_inbox);

                    let address_about_box = document.createElement('div');
                    address_about_box.classList.add('address_about_box');
                    info_box.appendChild(address_about_box);

                    let address_box = document.createElement('div');
                    address_box.classList.add('address_box');
                    address_about_box.appendChild(address_box);

                    let address_title = document.createElement('span');
                    address_title.classList.add('address_title');
                    address_box.appendChild(address_title);

                    let home_icon = document.createElement('i');
                    home_icon.classList.add('material-icons');
                    home_icon.innerText = "home";
                    address_title.appendChild(home_icon);

                    let address_inbox = document.createElement('span');
                    address_inbox.classList.add('address_inbox');
                    address_box.appendChild(address_inbox);

                    let address_line = document.createElement('span');
                    address_line.classList.add('address_line');
                    address_inbox.appendChild(address_line);

                    let about_box = document.createElement('div');
                    about_box.classList.add('about_box');
                    address_about_box.appendChild(about_box);

                    let about_title = document.createElement('span');
                    about_title.classList.add('about_title');
                    about_box.appendChild(about_title);

                    let description_icon = document.createElement('i');
                    description_icon.classList.add('material-icons');
                    description_icon.innerText = "description";
                    about_title.appendChild(description_icon);

                    let about_inbox = document.createElement('span');
                    about_inbox.classList.add('about_inbox');
                    about_box.appendChild(about_inbox);

                    let about_line = document.createElement('span');
                    about_line.classList.add('about_line');
                    about_inbox.appendChild(about_line);

                    // Adding Tabs + Menu System

                    let tabs_box = document.createElement('div');
                    tabs_box.classList.add('tabs_box');
                    card_select_content.appendChild(tabs_box);

                    let tabs = document.createElement('ul');
                    tabs.classList.add('tabs');
                    tabs_box.appendChild(tabs);

                    let comment_tab = document.createElement('li');
                    comment_tab.classList.add('tab');
                    tabs.appendChild(comment_tab);
                    let comment_a = document.createElement('a');
                    comment_a.setAttribute('onclick', 'c_tab_toggle()');
                    comment_a.setAttribute('id', 'tab_c');
                    comment_a.innerText = "Comments";
                    comment_tab.appendChild(comment_a);
                    
                    let menu_tab = document.createElement('li');
                    menu_tab.classList.add('tab');
                    tabs.appendChild(menu_tab);
                    let menu_a = document.createElement('a');
                    menu_a.setAttribute('onclick', 'm_tab_toggle()');
                    menu_a.setAttribute('id', 'tab_m');
                    menu_a.innerText = "Menu";
                    menu_tab.appendChild(menu_a);


                    let comment_container = document.createElement('div');
                    comment_container.setAttribute('id', 'comment_container');
                    tabs_box.appendChild(comment_container);


                    let comment_box = document.createElement('div');
                    comment_box.classList.add('comment_box');
                    comment_container.appendChild(comment_box);

                    let comment_scrollbox = document.createElement('span');
                    comment_scrollbox.classList.add('comment_scrollbox');
                    comment_box.appendChild(comment_scrollbox);

                    let collection_box = document.createElement('ul');
                    collection_box.classList.add('collection');
                    collection_box.setAttribute('id', 'comment_collection');
                    comment_scrollbox.appendChild(collection_box);

                    let addComment = document.createElement('div');
                    addComment.classList.add('addComment');
                    comment_box.appendChild(addComment);

                    let person_icon = document.createElement('i');
                    person_icon.classList.add('material-icons');
                    person_icon.classList.add('circle');
                    person_icon.classList.add('indigo');
                    person_icon.innerText = "person";
                    addComment.appendChild(person_icon);

                    let input = document.createElement('input');
                    input.setAttribute('type', 'text');
                    input.setAttribute('placeholder', 'Add a comment...');
                    input.setAttribute('id', 'comment_value');
                    addComment.appendChild(input);

                    let send_btn = document.createElement('i');
                    send_btn.classList.add('material-icons');
                    send_btn.classList.add('circle');
                    send_btn.classList.add('cyan');
                    send_btn.setAttribute('id', 'send_btn');
                    send_btn.innerText = "send";
                    addComment.appendChild(send_btn);

                    let menu_container = document.createElement('menu_container');
                    menu_container.setAttribute("id", "menu_container");
                    tabs_box.appendChild(menu_container);

                    let menu_system = document.createElement('div');
                    menu_system.classList.add('menu_system');
                    menu_container.appendChild(menu_system);

                    let table = document.createElement('table');
                    table.classList.add('striped');
                    menu_system.appendChild(table);

                    let thead = document.createElement('thead');
                    table.appendChild(thead);

                    let tr_head = document.createElement('tr');
                    thead.appendChild(tr_head);

                    let th1 = document.createElement('th');
                    th1.innerText = "Commodity";
                    tr_head.appendChild(th1);
                    let th2 = document.createElement('th');
                    th2.innerText = "Price";
                    tr_head.appendChild(th2);
                    let th3 = document.createElement('th');
                    th3.innerText = "Availablity";
                    tr_head.appendChild(th3);
                    

                    let tbody = document.createElement('tbody');
                    table.appendChild(tbody);


                    canteens.forEach(async (canteen) => {
                        if (canteen.id === item.id) {
                            image.src = canteen.ImgURL;
                            shopName_title.innerText = canteen.data.shopName;
                            phoneNo_inside_text.innerText = canteen.data.phoneNo;
                            ownerName.innerText = canteen.data.ownerName;

                            let s = canteen.data.status;
                            let v_status;

                            if (s === true) {
                                v_status = "OPEN";
                            } else {
                                v_status = "CLOSE";
                            }

                            status_line.innerText = v_status;

                            if (v_status === "OPEN") {
                                status_line.style.color = "rgb(54, 195, 25)";
                            }

                            if (v_status === "CLOSE") {
                                status_line.style.color = "red";
                            }

                            address_line.innerText = canteen.data.address;
                            about_line.innerText = canteen.data.about;


                            // Voting System

                            let vot_colRef = collection(db2, 'Voting System');
                            let vot_docRef = doc(db2, 'Voting System', item.id);

                            onSnapshot(vot_colRef, (snapshot) => {

                                let check = false;
                                let vendor_result = [];
                                let vote_check;

                                let voter = 'vote' + customer_email.slice(0, -4);

                                // Checking if the voter exists in the database or 1st time voter + fetching vote data
                                snapshot.docs.forEach((docum) => {
                                    // taking the chosen canteen
                                    if (docum.id === item.id) {
                                        check = true;
                                        if(docum.data()[voter] != undefined){
                                            // voter exists
                                            vote_check = docum.data()[voter].vote;
                                        }

                                        for (const key in docum.data()) {
                                            if (docum.data().hasOwnProperty(key)) {
                                                vendor_result.push(docum.data()[key].vote);
                                            }
                                        }
                                    }
                                })

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
                                let voteCount = document.querySelector('.voteCount');
                                voteCount.innerText = result;


                                let arrow_up = document.getElementById('arrow_up');
                                let arrow_down = document.getElementById('arrow_down');

                                if (vote_check === true) {
                                    arrow_up.style.color = "orange";
                                    arrow_down.style.color = "black";
                                }
                                if (vote_check == undefined) {
                                    arrow_up.style.color = "black";
                                    arrow_down.style.color = "black";
                                }
                                if (vote_check === false) {
                                    arrow_up.style.color = "black";
                                    arrow_down.style.color = "orange";
                                }

                                arrow_up.addEventListener('click', () => {
                                    let vote_ob = {};
                                    vote_ob[voter] = {
                                        vote: true
                                    };

                                    if (vote_check != true) {
                                        if (check === true) {
                                            updateDoc(vot_docRef, vote_ob);
                                        }
                                        else {
                                            setDoc(vot_docRef, vote_ob);
                                        }
                                    }

                                    if (vote_check === true) {
                                        if (check === true) {
                                            updateDoc(vot_docRef, {
                                                [`${voter}.vote`]: deleteField()
                                            });
                                        }
                                    }
                                });

                                arrow_down.addEventListener('click', () => {
                                    let vote_ob = {};
                                    vote_ob[voter] = {
                                        vote: false
                                    };

                                    if (vote_check != false) {
                                        if (check === true) {
                                            updateDoc(vot_docRef, vote_ob);
                                        }
                                        else {
                                            setDoc(vot_docRef, vote_ob);
                                        }
                                    }

                                    if (vote_check === false) {
                                        if (check === true) {
                                            updateDoc(vot_docRef, {
                                                [`${voter}.vote`]: deleteField()
                                            });
                                        }
                                    }
                                });

                            })

                            // Comment System

                            let com_colRef = collection(db2, 'Comment System');
                            let com_docRef = doc(db2, 'Comment System', item.id);
                            // Fetching comments
                            let vendor_comments = [];
                            let check = false;
                            await getDocs(com_colRef)
                                .then((snapshot) => {
                                    snapshot.docs.forEach((docum) => {
                                        if (docum.id === item.id) {
                                            check = true;
                                            for (const key in docum.data()) {
                                                if (docum.data().hasOwnProperty(key)) {
                                                    vendor_comments.push(docum.data()[key]);
                                                }
                                            }
                                        }
                                    })
                                })

                            vendor_comments.sort(function(a,b){return b.createdAt - a.createdAt});

                            // Commenting
                            let comment_btn = document.getElementById('send_btn');
                            if (comment_btn != null) {
                                comment_btn.addEventListener('click', (e) => {
                                    e.preventDefault();

                                    let comment_value = document.getElementById('comment_value').value;
                                    let map_name = 'comment' + customer_email.slice(0, -4) + comment_value;
                                    let comment_ob = {};
                                    comment_ob[map_name] = {
                                        username: customer_email,
                                        comment: comment_value,
                                        createdAt: serverTimestamp()
                                    };
                                    if (check) {
                                        updateDoc(com_docRef, comment_ob);
                                        console.log('Updated comments');
                                    }
                                    else {
                                        setDoc(com_docRef, comment_ob);
                                        check = true;
                                        console.log("Created comments");
                                    }

                                    // Appending to Local List
                                    let collection_item = document.createElement('li');
                                    collection_item.classList.add('collection-item');
                                    collection_item.classList.add('avatar');
                                    collection_box.prepend(collection_item);
                                    
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
                                    comment_username.innerText = customer_email;
                                    collection_item.appendChild(comment_username);
                                    
                                    let comment_line = document.createElement('p');
                                    comment_line.classList.add('comment_line');
                                    comment_line.innerText = comment_value;
                                    collection_item.appendChild(comment_line);

                                    // to reset comment input
                                    let comment_input = document.getElementById('comment_value');
                                    comment_input.value = "";
                                });
                            }

                            // Appending each comment to ul
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

                            // Menu System

                            let menu_colRef = collection(db2, 'Menu System');

                            let menu_array = [];
                            await getDocs(menu_colRef)
                                .then((snapshot) => {
                                    snapshot.docs.forEach((docum) => {
                                        if(docum.id == item.id){
                                            // appending all the menu items
                                            for (const key in docum.data()) {
                                                if (docum.data().hasOwnProperty(key)) {
                                                    if(key != "sample"){
                                                        menu_array.push(docum.data()[key]);
                                                    }
                                                }
                                            }
                                            console.log(menu_array);
                                        }
                                    })
                                })
                                .catch((err) => {
                                    console.log(err.code);
                                })

                            // appending all menu inside table
                            menu_array.forEach((menu_item) => {

                                let tr_body = document.createElement('tr');
                                
                                let td_comm = document.createElement('td');
                                td_comm.innerText = menu_item.commodity;
                                tr_body.appendChild(td_comm);

                                let td_price = document.createElement('td');
                                td_price.innerText = "₹" + menu_item.price;
                                tr_body.appendChild(td_price);

                                let td_ava = document.createElement('td');
                                let ava = menu_item.availability;
                                if(ava == true){
                                    td_ava.innerText = "Available";
                                }
                                else{
                                    td_ava.innerText = "Not Available";
                                }
                                tr_body.appendChild(td_ava);

                                tbody.appendChild(tr_body);
                            })
                        }
                    })

                    // To make background blur
                    setTimeout(() => {
                        let blur = document.getElementById('blur');
                        blur.classList.toggle('active');
                    },100)

                    // Draw the canteen modal
                    document.body.appendChild(card_select);

                    let popup = document.getElementById('popup');
                    setTimeout(() => {
                        popup.classList.toggle('active');
                    }, 1);

                    // Initializing card close button as null 
                    let closeBTN = document.getElementById('closeBTN');

                    if (closeBTN != null) {
                        closeBTN.addEventListener('click', () => {
                            setTimeout(() => {
                                popup.classList.toggle('active');
                            }, 10);
                            // To unblur background
                            setTimeout(() => {
                                let blur = document.getElementById('blur');
                                blur.classList.toggle('active');
                            },200)
                            setTimeout(() => {
                                // To refresh Modal for another selection of card
                                let card_select_remove = document.querySelector('.card_select');
                                if (card_select_remove != null) {
                                    card_select_remove.remove();
                                }
                            }, 159);
                        });
                    }
                });
            });
        })
    }
});

// Filter Box
let shopName_btn = document.getElementById('shopName_btn');
let address_btn = document.getElementById('address_btn');
let phone_btn = document.getElementById('phone_btn');
let status_btn = document.getElementById('status_btn');

let shopName_filter = document.getElementById('shopName_filter');
let address_filter = document.getElementById('address_filter');
let phone_filter = document.getElementById('phone_filter');
let status_filter = document.getElementById('status_filter');

shopName_btn.addEventListener('click', (e) => {
    e.preventDefault();

    if(!shopName_filter.classList.contains('hide')){
        setTimeout(() => {
            shopName_filter.classList.remove('active');
        }, 20);
        setTimeout(() => {
            shopName_filter.classList.add('hide');
        }, 190);
    }
    if(shopName_filter.classList.contains('hide')){
        shopName_filter.classList.remove('hide');
    }    
    
    setTimeout(() => {
        shopName_filter.classList.add('active');
    }, 0.0001);


    let shopIcon = document.getElementById('shopIcon');
    if(!shopIcon.classList.contains('active')){
        shopIcon.classList.add('active');
    }
    else{
        shopIcon.classList.remove('active');
    }
})
address_btn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if(!address_filter.classList.contains('hide')){
        setTimeout(() => {
            address_filter.classList.remove('active');
        }, 20);
        setTimeout(() => {
            address_filter.classList.add('hide');
        }, 190);
    }
    if(address_filter.classList.contains('hide')){
        address_filter.classList.remove('hide');
    }

    setTimeout(() => {
        address_filter.classList.add('active');
    }, 0.0001);

    let addressIcon = document.getElementById('addressIcon');
    if(!addressIcon.classList.contains('active')){
        addressIcon.classList.add('active');
    }
    else{
        addressIcon.classList.remove('active');
    }
})
phone_btn.addEventListener('click', (e) => {
    e.preventDefault();

    if(!phone_filter.classList.contains('hide')){
        setTimeout(() => {
            phone_filter.classList.remove('active');
        }, 20);
        setTimeout(() => {
            phone_filter.classList.add('hide');
        }, 190);
    }
    if(phone_filter.classList.contains('hide')){
        phone_filter.classList.remove('hide');
    }

    setTimeout(() => {
        phone_filter.classList.add('active');
    }, 0.0001);

    let phoneIcon = document.getElementById('phoneIcon');
    if(!phoneIcon.classList.contains('active')){
        phoneIcon.classList.add('active');
    }
    else{
        phoneIcon.classList.remove('active');
    }
})
status_btn.addEventListener('click', (e) => {
    e.preventDefault();

    if(!status_filter.classList.contains('hide')){
        setTimeout(() => {
            status_filter.classList.remove('active');
        }, 20);
        setTimeout(() => {
            status_filter.classList.add('hide');
        }, 190);
    }
    if(status_filter.classList.contains('hide')){
        status_filter.classList.remove('hide');
    }

    setTimeout(() => {
        status_filter.classList.add('active');
    }, 0.0001);

    let statusIcon = document.getElementById('statusIcon');
    if(!statusIcon.classList.contains('active')){
        statusIcon.classList.add('active');
    }
    else{
        statusIcon.classList.remove('active');
    }
})


// Profile Button

let profile = document.getElementById('profile');
let profile_drop_down = document.getElementById('profile_drop_down');
profile.addEventListener('click', (e) => {
    e.preventDefault();

    if(profile_drop_down.style.display == "none"){
        profile_drop_down.style.display = "flex";
    }
    else{
        setTimeout(() => {
            profile_drop_down.style.display = "none";
        }, 200)
    }
    setTimeout(() => {
        profile_drop_down.classList.toggle('active');
    }, 2);
})

document.getElementById('signOut').addEventListener('click', () => {
    signOut(auth1)
        .then(() => {
            console.log("User Signed Out");
            window.location.replace('index.html');
        })
        .catch((err) => {
            console.log(err.message);
        })
});
