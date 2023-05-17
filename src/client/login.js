import { Crud } from './pouchdb.js';

// connects to existing user database

//Establish login button

let loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", async function(event) {
  // will make sure of its usage later
  event.preventDefault();
  
  //Get username and password
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  
  //Fetch to server
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