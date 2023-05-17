
import { otherProfileName } from "./profile.js"


const postTitle = document.getElementById('title');
const postContent = document.getElementById('description');
const postButton = document.getElementById('post');

postButton.addEventListener('click', async () => {
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

        let pack = {
            title: title,
            description: desc,
            reviewer: localStorage.getItem("curr_user"),
            reviewee: localStorage.getItem("profile_view_id")
        }

        //Send the review to database
        await fetch("/reviews", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pack)
        });

        window.location.replace("profile-reviews.html")
        
        console.log(pack)
    }
});

