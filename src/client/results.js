

const postTitle = document.getElementById('title');
const postContent = document.getElementById('description');
const searchText = document.getElementById('search');
const searchButton = document.getElementById('search-btn');
const tokenNumber = document.getElementById('tokens');
const deadline = document.getElementById('deadline');
const postTags = document.getElementById('tags');

// Dynamically create listings given a list of posts
function displayListings(posts){

}

displayListings(readPosts().slice(0,11));

// Update listings on search
searchButton.addEventListener('click', ()=>{
    let listings = [];
    let searchTerm = searchText.ariaValueText.toLowerCase();
    let posts = readPosts();
    posts = posts.filter(post => {
        let title = post.postTitle.toLowerCase();
        let description = post.postContent.toLowerCase();
        return title.includes(searchTerm) || description.includes(searchTerm);
    });

    displayListings();
});

// Filter listings based on selected tags

// Sort listings