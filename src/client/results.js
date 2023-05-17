const searchText = document.getElementById('search');
const searchButton = document.getElementById('search-btn');
const searchContainer = document.getElementById('link');
const tagSearch = document.getElementById('tag-search');
const tags = document.getElementsByClassName('tag');
const sortOptions = document.getElementsByClassName('sort');
const resultsDiv = document.getElementById('results');

let posts = [];

async function refresh(){
    let response = await fetch('/posts', {
        method: 'GET'
    });
    let posts = await response.json();
    return posts;
}

function grab(searchTerm){
    return posts.filter(post => {
        let title = post.post_title.toLowerCase();
        let description = post.post_description.toLowerCase();
        return (title.includes(searchTerm) || description.includes(searchTerm)) && !post.finished;
    });
}

async function getUser(id){
    const response = await fetch(`/profiles/${id}`, {method: 'GET'});
    const user = await response.json();
    return user.user_name;
}

// Dynamically create listing elements given a list of posts
async function displayListings(container){
    document.getElementById("user-prof").addEventListener("click", () => {
        localStorage.setItem("profile_view_id", localStorage.getItem("curr_user"));
        window.location.href = `./profile.html`;
    });
    
    container.innerHTML = '';
    if(curr_posts.length <= 0) {
        const message = document.createElement('h4');
        message.innerHTML = `
            <span id="sad">&#9785;</span> 
            <br> Sorry, we were not able to find any matches. 
            <br> Try again.`;
        message.setAttribute('id', 'no-result');
        container.append(message);
    } else {
        const unacceptedPosts = curr_posts.filter(x=>!x.finished);
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
            view.addEventListener("click", function() {
                localStorage.setItem("curr_post_id", post._id);
                window.location.href=`/posts/${post._id}`;
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
            // userlink.setAttribute('href', `profile.html`);
            userlink.addEventListener("click", () => {
                localStorage.setItem("profile_view_id", post.profile_id)
                window.location.href = `profile.html`;
            });
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

// Update listings on search
function buildSearch(){
    let searchTerm = searchText.value === '' ? '' : '?' + searchText.value.toLowerCase();
    console.log(searchText.value);
    document.getElementById('link').setAttribute('href', `search.html${searchTerm}`);
}
searchButton.addEventListener('click', buildSearch);
searchText.addEventListener('keydown', (e) => { if(e.key === 'Enter'){ searchButton.click(); } });

// Tag search
tagSearch.addEventListener('input', () => {
    for(let t of tags){
        if(!t.innerText.toUpperCase().includes(tagSearch.value.toUpperCase())){
            t.classList.add('d-none');
        } else {
            t.classList.remove('d-none');
        }
    }
});

// Filter listings based on selected tags
Array.from(tags).forEach(tagElement => tagElement.addEventListener('click', () => {
    if(tagElement.classList.value.includes('active')) { 
        tagElement.classList.remove('active');
        const remainingActive = Array.from(document.getElementsByClassName('active'));
        curr_posts = grab('');
        if(remainingActive.length > 0) {
            curr_posts = curr_posts.filter(post => {
                for(let t of remainingActive) {
                    console.log(t);
                    if(post.post_tags.toLowerCase().includes(t.innerText.toLowerCase())){
                        return true
                    }
                }
                return false
            });
        } 
    } else {
        tagElement.classList.add('active');
        curr_posts = curr_posts.filter(post => post.post_tags.toLowerCase().includes(tagElement.innerText.toLowerCase()));
    }
    displayListings(resultsDiv);
}));

// Sort listings
Array.from(sortOptions).forEach(option => option.addEventListener('click', () => {
    const field = option.innerText;
    if(field === 'Deadline'){
        curr_posts = curr_posts.sort((a,b) => 
            new Date(a.deadline.replace(/-/g, "/")) - new Date(b.deadline.replace(/-/g, "/")) // supports safari
        );
    }
    else if(field === 'A-Z'){
        curr_posts = curr_posts.sort((a,b) => 
            a.post_title.toLowerCase() > b.post_title.toLowerCase() ? 1 
            : a.post_title.toLowerCase() < b.post_title.toLowerCase() ? -1 : 0
        );
    }
    else if(field === 'Z-A'){
        curr_posts = curr_posts.sort((a,b) => 
            a.post_title.toLowerCase() < b.post_title.toLowerCase() ? 1 
            : a.post_title.toLowerCase() > b.post_title.toLowerCase() ? -1 : 0
        );
    }
    else if(field === 'Tokens'){
        curr_posts = curr_posts.sort((a,b) => b.tokens - a.tokens);
    }
    displayListings(resultsDiv);
}));


posts = await refresh();
let query = window.location.search.substring(1);
let curr_posts = grab(query);

displayListings(resultsDiv);