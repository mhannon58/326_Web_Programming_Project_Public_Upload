// import { Crud } from './pouchdb.js';

// const signupObj = new Crud('signup_db');

let registerButton = document.getElementById("register-button");
registerButton.addEventListener("click", async function(event) {
  // will make sure of its usage later
  event.preventDefault();

  let username = document.getElementById("username").value;
  // localStorage.setItem("curr_user", username);
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let doc = {
      username: username,
      email: email,
      tokens: 0,
      password: password
      // createdPosts: [],
      // acceptedPosts: [],
      // reviews: [],
  }

  // this should send a POST request to postsRouter.js
  const response = await fetch("/profiles", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(doc)
  });
  const id = await response.json();
  localStorage.setItem("curr_user", id);

  // await signupObj.createDoc(doc);
  // let stored = await signupObj.readDoc(username);

  window.location.replace("search.html")
});