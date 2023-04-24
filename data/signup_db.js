import { Crud } from './pouchdb.js';

const obj = new Crud('signup_db');
// shows db info
// obj.db.info().then((info) => console.log(info))

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
      password: password
  }

  await obj.createDoc(doc);
  let stored = await obj.readDoc(username);
  await obj.updateDoc(username, { email: "The real deal email" });
  stored = await obj.readDoc(username);
  await obj.deleteDoc(username);
  // should produce an error
  // stored = await obj.readDoc(username);
});