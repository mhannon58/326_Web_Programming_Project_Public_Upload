//import { getAllPosts, _init_ } from "./postcrud.js";

const searchText = document.getElementById('search');
const searchButton = document.getElementById('search-btn');
const tagSearch = document.getElementById('tag-search');
const tags = document.getElementById('tag');
const sortOptions = document.getElementsByClassName('sort');
const resultsDiv = document.getElementById('results');

let posts = [];

async function refresh(){
    let response = await fetch('/posts', {
        method: 'GET'
    });
    let posts = await response.json();
    return posts;
    //PouchDB
    //let docs = await getAllPosts();
    //return docs.rows.map(d=>d.doc);
}

async function getUser(id){
    const response = await fetch(`/profiles/${id}`, {method: 'GET'});
    const user = await response.json();
    return user.user_name;
}

// Dynamically create listing elements given a list of posts
async function displayListings(posts, container){
    container.innerHTML = '';
    if(posts.length <= 0) {
        const message = document.createElement('h5');
        message.innerText = 'REFRESH THE PAGE';
        container.append(message);
    } else {
        const unacceptedPosts = posts.filter(x=>!x.finished);
        for(let i = 0; i < unacceptedPosts.length; i++){
            const post = unacceptedPosts[i];

            const listing = document.createElement('div');
            listing.classList.add('container', 'border', 'py-3', 'my-3');

            const row = document.createElement('div');
            row.classList.add('row');

            const col1 = document.createElement('div');
            col1.classList.add('col-8');

            const title = document.createElement('h5');
            title.setAttribute('id', 'title');
            title.innerText = post.post_title;

            const description = document.createElement('p');
            description.setAttribute('id', 'description');
            let text = post.post_description.length > 250 ? post.post_description.slice(0,251)+ "..." : post.post_description;
            description.innerText = text;

            const tags = document.createElement('p');
            tags.setAttribute('id', 'tags');
            tags.classList.add('mb-0');
            let t = post.post_tags.length === 0 ? 'N/A' : post.post_tags.toUpperCase().split(' ').join(', ');
            tags.innerText = "Tags: " + t;

            const deadline = document.createElement('p');
            deadline.setAttribute('id', 'deadline');
            deadline.innerText = `Deadline: ${post.deadline}`;

            col1.append(title);
            col1.append(description);
            col1.append(tags);
            col1.append(deadline);
        

            const col2 = document.createElement('div');
            col2.classList.add('col-4','text-end');
            const view = document.createElement('button');
            // view.setAttribute('onClick', 'window.location.href="./listing.html"'); // button has no specified path
            view.addEventListener("click", function() {
                localStorage.setItem("curr_post_id", post["_id"]["$oid"]);
                window.location.href="./listing.html"
            });
            view.innerText = 'View';
            view.classList.add('btn', 'btn-primary');
            view.setAttribute('type', 'button');

            const user = document.createElement('p');
            user.setAttribute('id', 'usernameContainer');
            const userlink = document.createElement('a');
            userlink.setAttribute('id', 'username')
            userlink.innerText = `@${await getUser(post.profile_id)}`; 
            //userlink.setAttribute('href', `profile/username/${username}`);
            userlink.setAttribute('href', `profile.html`);
            user.append(userlink);


            const tokens = document.createElement('p');
            tokens.classList.add('mb-0');
            tokens.setAttribute('id', 'tokens');
            tokens.innerText = "Tokens: " + post.tokens;

            col2.append(view);
            col2.append(user);
            col2.append(tokens);

            row.append(col1);
            row.append(col2);
            listing.append(row);

            container.append(listing);
        }
    }
}

posts = await refresh();
displayListings(posts, resultsDiv); // display mockdata

function grab(){
    let searchTerm = searchText.value.toLowerCase();
    return posts.filter(post => {
        let title = post.post_title.toLowerCase();
        let description = post.post_description.toLowerCase();
        return title.includes(searchTerm) || description.includes(searchTerm);
    });
}

// Update listings on search
searchButton.addEventListener('click', ()=>{
    let searchTerm = searchText.value.toLowerCase();
    displayListings(grab(), resultsDiv);
});

// Filter listings based on selected tags
// TODO

// Sort listings
Array.from(sortOptions).forEach(option => option.addEventListener('click', ()=> {
    //let active = document.getElementsByClassName('active');
    //if(active.length > 0){ active[0].classList.remove('active'); }
    //option.classList.add('active');
    const field = option.innerText;
    let listings = grab();
    if(field === 'Deadline'){
        listings = listings.sort((a,b) => 
            new Date(a.deadline.replace(/-/g, "/")) - new Date(b.deadline.replace(/-/g, "/"))
        );
        console.log("2021-201-2".replace(/-/g, "/"))
    }
    else if(field === 'A-Z'){
        listings = listings.sort((a,b) => 
            a.post_title.toLowerCase() > b.post_title.toLowerCase() ? 1 
            : a.post_title.toLowerCase() < b.post_title.toLowerCase() ? -1 : 0
        );
    }
    else if(field === 'Z-A'){
        listings = listings.sort((a,b) => 
            a.post_title.toLowerCase() < b.post_title.toLowerCase() ? 1 
            : a.post_title.toLowerCase() > b.post_title.toLowerCase() ? -1 : 0
        );
    }
    else if(field === 'Tokens'){
        listings = listings.sort((a,b) => b.tokens - a.tokens);
    }
    displayListings(listings, resultsDiv);
}));