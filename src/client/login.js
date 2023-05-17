import { Crud } from './pouchdb.js';

// connects to existing user database
let loginObj = new Crud('signup_db');
let userData = null;

let loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", async function(event) {
  // will make sure of its usage later
  event.preventDefault();
  
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  
  let route = "/profiles/username/" + username;
  const response = await fetch(route, {
    method: 'GET'
  });
  const profile = await response.json();
  console.log(profile);

  if(password === profile.password)
  {
    localStorage.setItem("curr_user", profile._id)
    console.log(localStorage.getItem("curr_user"))
    window.location.replace("search.html");
  }
  else
  {
    alert("Incorrect password, please try again!");
  }
});