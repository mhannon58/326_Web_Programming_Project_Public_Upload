// import { getNextId, createPost } from "./postcrud.js";
// import { Crud } from './pouchdb.js';

import { initNavbar } from "./navbar.js";

initNavbar();

const postTitle = document.getElementById('title');
const postContent = document.getElementById('description');
const postButton = document.getElementById('post');
const tokenNumber = document.getElementById('tokens');
const deadline = document.getElementById('deadline');
const postTags = document.getElementById('tags');

// const signupObj = new Crud('signup_db')

postButton.addEventListener('click', async () => {
    const title = postTitle.value;
    const desc = postContent.value;
    const tokens = tokenNumber.value;
    const date = deadline.value;
    const tags = [...postTags.options].filter(option => option.selected).map(option => option.textContent).join(' ').toLowerCase();
    console.log(tags);

    // check for missing fields
    if (!title) {
        alert('Title required.');
    }
    else if (!desc) {
        alert('Description required.');
    }
    else if (!tokens) {
        alert('Number of tokens required.');
    }
    else if (tokens < 0) {
        alert('Tokens must be non-negative.');
    }
    else if (!date) {
        alert('Deadline required.');
    }
    // TODO: current date should also be a valid date
    // right now, today is marked as invalid date
    // fix this comparison
    else if (new Date(date) < new Date()) {
        alert('Deadline must be in the future.');
    }
    else {
        // create post here
        // alert(`${title} ${desc} ${tokens} ${date}`);
        // alert(tags);      
        // getNextId().then(async (id) => {
        //     const id_string = id.toString();
            
        //     let username = localStorage.getItem("curr_user")

        //     let userData = await signupObj.readDoc(username);
        //     userData.createdPosts.push(id_string);
        //     signupObj.updateDoc(username, { createdPosts: userData.createdPosts })
        //     userData = await signupObj.readDoc(username);

        //     console.log("The id we are about to post is", id);
        //     createPost(id_string, title, desc, tags, tokens, date);
        // });
        
        let pack = {
            post_title: title,
            post_description: desc,
            post_tags: tags,
            profile_id: localStorage.getItem("curr_user"),
            tokens: Number(tokens),
            deadline: date
        }

        await fetch("/posts", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(pack)
          });
    }
});

// TODO: add save button functionality