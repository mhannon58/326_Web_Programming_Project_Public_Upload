// import { loadProfiles, loadPosts } from "./load.js";
// import { getAllPosts } from "./postcrud.js";

export let otherProfileName = '';

function displayListings(posts, container){
  container.innerHTML = '';
  //posts.filter(x => x["profile_id"] === 1 && x["finished"] === false).forEach(post => {
  posts.forEach(post => {
      console.log('test');

      const listing = document.createElement('div');
      listing.classList.add('card', 'card-body', 'mb-4');

      const row = document.createElement('div');
      row.classList.add('row');

      const col1 = document.createElement('div');
      col1.classList.add('col-8');

      const title = document.createElement('h5');
      title.setAttribute('id', 'title');
      title.innerText = post.post_title;

      const description = document.createElement('p');
      description.setAttribute('id', 'description');
      description.innerText = post.post_description.length > 250 ? post.post_description.slice(0,251)+ "..." : post.post_description;;

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


      const tokens = document.createElement('p');
      tokens.classList.add('mb-0');
      tokens.setAttribute('id', 'tokens');
      tokens.innerText = "Tokens: " + post.tokens;

      col2.append(view);
      col2.append(tokens);

      row.append(col1);
      row.append(col2);
      listing.append(row);

      container.append(listing);
  });
}


async function setup() {
  let reviews = document.getElementById("review-button");
  reviews.addEventListener("click", () => {
    let url = window.location.href;
    otherProfileName = url.split("/")[2].substring(1);
    console.log(otherProfileName)
    console.log("justprinted")
    window.location.href = "./profile-reviews.html";
  });
  
  // const profiles = await loadProfiles();
  // const profile = await profiles.get('1');

  console.log(localStorage.getItem("curr_user"));
  let route = "/profiles/" + localStorage.getItem("profile_view_id");
  const response = await fetch(route, {
    method: 'GET'
  });
  const profile = await response.json();
  console.log(profile);

  const listings = document.getElementById('listings');

  let posts = [];

  async function refresh() {
    let postedRoute = "/posts/posted/" + localStorage.getItem("profile_view_id");
    console.log(postedRoute);
    const postedResp = await fetch(postedRoute, {
      method: 'GET'
    });
    let docs = await postedResp.json();
    docs = docs.filter((post) => !post.finished);
    return docs;
  }

  posts = await refresh();

  // console.log(posts);

  displayListings(posts, listings);

  // console.log(profile);

  // set profile name
  const profileName = document.getElementById('full-name');
  profileName.textContent = `${profile.user_name}`;

  // set email
  const email = document.getElementById('email');
  email.textContent = profile.email;

  // set tokens
  const tokens = document.getElementById('tokens');
  tokens.textContent = `Tokens: ${profile.tokens}`;
}

// need to be able to read the mock_profiles
try {
  // get profile document number 1
  // aka jeremias
  setup();


    
} catch (err) {
  console.log(err);
}

