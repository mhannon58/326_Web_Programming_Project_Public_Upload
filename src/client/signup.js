import { Crud } from './pouchdb.js';

const signupObj = new Crud('signup_db');

let registerButton = document.getElementById("register-button");
registerButton.addEventListener("click", async function(event) {
  // will make sure of its usage later
  event.preventDefault();

  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let doc = {
      _id: username,
      email: email,
      password: password,
      createdPosts: [],
      acceptedPosts: [],
      reviews: []
  }

  await signupObj.createDoc(doc);
  let stored = await signupObj.readDoc(username);

  window.location.replace("search.html")
});