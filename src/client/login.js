import { Crud } from './pouchdb.js';

// connects to existing user database
let loginObj = new Crud('signup_db');
let userData = null;

let loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", async function(event) {
  // will make sure of its usage later
  event.preventDefault();
  
  let username = document.getElementById("username").value;
  userData = await loginObj.readDoc(username);

  await fetch("/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  //window.location.replace("search.html")
  
});