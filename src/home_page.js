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

    if (user) {

        let colRef = collection(db, 'Canteen');

        let canteens = [];

        onSnapshot(colRef, (snapshot) => {

            snapshot.docs.forEach((doc) => {
                canteens.push({ ...doc.data(), id: doc.id })
            })
            console.log(canteens);

            let container_remove = document.getElementById('card-container');
            container_remove.remove();

            let card_container = document.createElement('div');
            card_container.setAttribute('id', 'card-container');
            card_container.setAttribute('class', 'blur');
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
                if (s === true) {
                    v_status = "OPEN";
                } else {
                    v_status = "CLOSE";
                }
                let img_src = canteen.ImgURL;



                // Card Overall

                let card_item = document.createElement('div');
                card_item.classList.add('card-item');
                card_item.classList.add('z-depth-2');
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
                address_innerTEXT.innerHTML = v_address;
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
                description_innerTEXT.innerHTML = v_about;
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
                if (v_status === "OPEN") {
                    open_close.style.color = "chartreuse";
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




            let card_select_remove = document.querySelector('.card_select');
            card_select_remove.remove();

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


            let cross_btn = document.createElement('span');
            cross_btn.classList.add('cross_btn');
            let close_icon = document.createElement('i');
            close_icon.classList.add('material-icons');
            close_icon.setAttribute('id', 'closeBTN');
            close_icon.innerHTML = "close";
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
            call_icon.innerHTML = "call";
            let phoneNo_innerTEXT = document.createElement('span');
            phone_side.appendChild(call_icon);
            phone_side.appendChild(phoneNo_innerTEXT);
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
            arrow_up.innerHTML = "arrow_drop_up";
            vote_item.appendChild(arrow_up);

            let voteCount = document.createElement('span');
            voteCount.classList.add('voteCount');
            vote_item.appendChild(voteCount);

            let arrow_down = document.createElement('i');
            arrow_down.classList.add('material-icons');
            arrow_down.setAttribute('id', 'arrow_down');
            arrow_down.innerHTML = "arrow_drop_down";
            vote_item.appendChild(arrow_down);


            let status_container = document.createElement('div');
            status_container.classList.add('status_container');
            info_box.appendChild(status_container);

            let status_inbox = document.createElement('span');
            status_inbox.classList.add('status_inbox');
            status_inbox.innerHTML = "Status: ";
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
            home_icon.innerHTML = "home";
            address_title.appendChild(home_icon);

            let address_inbox = document.createElement('span');
            address_inbox.classList.add('address_inbox');
            address_box.appendChild(address_inbox);

            let address_line = document.createElement('span');
            address_line.classList.add('address_line');
            address_inbox.appendChild(address_line);
            // appending address to address_line left


            let about_box = document.createElement('div');
            about_box.classList.add('about_box');
            address_about_box.appendChild(about_box);

            let about_title = document.createElement('span');
            about_title.classList.add('about_title');
            about_box.appendChild(about_title);

            let description_icon = document.createElement('i');
            description_icon.classList.add('material-icons');
            description_icon.innerHTML = "description";
            about_title.appendChild(description_icon);

            let about_inbox = document.createElement('span');
            about_inbox.classList.add('about_inbox');
            about_box.appendChild(about_inbox);

            let about_line = document.createElement('span');
            about_line.classList.add('about_line');
            about_inbox.appendChild(about_line);
            // appending adescription to about_line left





            let comment_box = document.createElement('div');
            comment_box.classList.add('comment_box');
            card_select_content.appendChild(comment_box);

            let comment_heading = document.createElement('span');
            comment_heading.classList.add('comment_heading');
            comment_box.appendChild(comment_heading);

            let h5 = document.createElement('h5');
            h5.innerHTML = "Comments: ";
            comment_heading.appendChild(h5);


            let comment_scrollbox = document.createElement('span');
            comment_scrollbox.classList.add('comment_scrollbox');
            comment_box.appendChild(comment_scrollbox);

            let collection = document.createElement('ul');
            collection.classList.add('collection');
            comment_scrollbox.appendChild(collection);
            // appending li to collection and comments to li left


            let addComment = document.createElement('div');
            addComment.classList.add('addComment');
            comment_box.appendChild(addComment);

            let person_icon = document.createElement('i');
            person_icon.classList.add('material-icons');
            person_icon.classList.add('circle');
            person_icon.classList.add('cyan');
            person_icon.innerHTML = "person";
            addComment.appendChild(person_icon);

            let input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('placeholder', 'Add a comment...');
            addComment.appendChild(input);




            Array.from(card_item).forEach((item) => {
                // console.log(item.id);

                item.addEventListener('click', () => {
                    // window.location.replace('commentSystem.html');


                    canteens.forEach((canteen) => {
                        if (canteen.id === item.id) {

                            image.src = canteen.ImgURL;
                            shopName_title.innerHTML = canteen.data.shopName;
                            phoneNo_innerTEXT.innerHTML = canteen.data.phoneNo;
                            ownerName.innerHTML = canteen.data.ownerName;

                            let s = canteen.data.status;
                            let v_status;
                            if (s === true) {
                                v_status = "OPEN";
                            } else {
                                v_status = "CLOSE";
                            }
                            status_line.innerHTML = v_status;
                            if(v_status === "OPEN"){
                                status_line.style.color = "chartreuse";
                            }
                            if(v_status === "CLOSE"){
                                status_line.style.color = "red";
                            }

                            address_line.innerHTML = canteen.data.address;
                            about_line.innerHTML = canteen.data.about;

                        }
                    })

                    let card_container = document.getElementById('card-container');
                    card_container.classList.toggle('active');
                    // console.log(card_container);

                    let popup = document.getElementById('popup');
                    popup.classList.toggle('active');

                });
            });

            document.body.appendChild(card_select);

            let closeBTN = document.getElementById('closeBTN');
            closeBTN.addEventListener('click', () => {
                let card_container = document.getElementById('card-container');
                card_container.classList.toggle('active');
                // console.log(card_container);

                let popup = document.getElementById('popup');
                popup.classList.toggle('active');

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




