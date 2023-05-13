import * as CRUD_reviews from "./reviewcrud.js"
import { otherProfileName } from "./profile.js"
let postdb = new PouchDB('Posts')
let generaldb = new PouchDB('General')
let reviewdb = new PouchDB('Reviews')

import { Crud } from './pouchdb.js';
import { initNavbar } from "./navbar.js";

initNavbar();

const signupObj = new Crud('signup_db')

CRUD_reviews._init_()

const postTitle = document.getElementById('title');
const postContent = document.getElementById('description');
const postButton = document.getElementById('post');

postButton.addEventListener('click', () => {
    const title = postTitle.value;
    const desc = postContent.value;

    // check for missing fields
    if (!title) {
        alert('Title required.');
    }
    else if (!desc) {
        alert('Description required.');
    }
    else {
        // create post here
        alert(`${title} ${desc}`);
      
        CRUD_reviews.getNextId().then(async (id) => {
            // const id_string = "review" + id.toString();

            // let username = localStorage.getItem("curr_user")

            // let userData = await signupObj.readDoc(username);
            // userData.reviews.push(id_string);
            // signupObj.updateDoc(username, { reviews: userData.reviews })
            // userData = await signupObj.readDoc(username);

            // console.log("The id we are about to post is", id);
            // CRUD_reviews.createReview(id_string, title, desc);

            let pack = {
                title: title,
                description: desc,
                reviewer: localStorage.getItem("curr_user"),
                reviewee: otherProfileName
            }

            await fetch("/reviews", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(pack)
              });
        });

        // window.location.replace("profile-reviews.html")
        
    }
});

// TODO: add save button functionality

