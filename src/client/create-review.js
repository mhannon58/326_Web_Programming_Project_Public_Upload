import * as CRUD_reviews from "./reviewcrud.js"
let postdb = new PouchDB('Posts')
let generaldb = new PouchDB('General')
let reviewdb = new PouchDB('Reviews')

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
      
        CRUD_reviews.getNextId().then(id => {
            const id_string = "review" + id.toString();

            console.log("The id we are about to post is", id);
            CRUD_reviews.createReview(id_string, title, desc);
        });

        window.location.replace("profile-reviews.html")
        
    }
});

// TODO: add save button functionality

