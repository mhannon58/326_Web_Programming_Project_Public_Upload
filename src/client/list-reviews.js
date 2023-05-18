import * as CRUD_reviews from "./reviewcrud.js"
import { Crud } from './pouchdb.js';
let postdb = new PouchDB('Posts')
let generaldb = new PouchDB('General')
let reviewdb = new PouchDB('Reviews')
let userdb = new Crud('signup_db');

//With the input of an html element, title and desc of a review, populates a single review in the html
function populateReview(element, title_text, desc_text){
    var firstDiv = document.createElement("div");
    firstDiv.classList.add("card")
    firstDiv.classList.add("mb-4")

    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body")

    var firstRow = document.createElement("div");
    firstRow.classList.add("row")
    firstRow.classList.add("mb-4")


    var secondDiv = document.createElement("div");
    secondDiv.classList.add("col-sm-10")

    var head3 = document.createElement("h3")
    head3.classList.add("mb-0")

    var title = document.createElement("a")
    title.innerHTML = "<a>" + title_text + "</a>"

    var desc = document.createElement("p")
    desc.classList.add("mb-0")
    desc.innerHTML = "<p>" + desc_text + "</p>"

    firstDiv.appendChild(cardBody)
    cardBody.appendChild(firstRow)
    firstRow.appendChild(secondDiv)
    secondDiv.appendChild(head3)
    head3.appendChild(title)

    element.appendChild(firstDiv)
    cardBody.appendChild(desc)
}

const reviewLoc = document.getElementById('reviews')
const reviewButton = document.getElementById('review-button')

//Establish the id of the profile we are viewing
let reviewee = localStorage.getItem("profile_view_id")

//Fetch Profile
let route = "/profiles/" + localStorage.getItem("profile_view_id");
let response = await fetch(route, {
method: 'GET'
});

const profile = await response.json();

//set Username
const profileName = document.getElementById('full-name');
profileName.textContent = `${profile.user_name}`;

// set email
const email = document.getElementById('email');
email.textContent = profile.email;

//obtain all previous reviews
response = await fetch("/reviews/"+ reviewee, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    //body: JSON.stringify(pack)
});


//loop through and populate file with the reviews
response = await response.json()
for(let e of response){
    populateReview(reviewLoc, e.title, e.description)
}

