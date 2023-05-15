import { readPost } from './postcrud.js';
import { Crud } from './pouchdb.js'

// const signupObj = new Crud('signup_db')
// const postsObj = new Crud('Posts')

function addChildren(element, title, desc, tokens)
{
  var outer = document.createElement("div")
  outer.classList.add("row", "mt3")


  var firstInnerDiv = document.createElement("div");
  firstInnerDiv.classList.add("col-md-4");

  const t = document.createElement("h2");
  t.innerText = title;
  firstInnerDiv.append(t);

  outer.appendChild(firstInnerDiv)

  var secondInnerDiv = document.createElement("div");
  secondInnerDiv.classList.add("row", "mt3");


  var secondInnerInnerDiv = document.createElement("div");
  secondInnerInnerDiv.classList.add("col-md-8");
  secondInnerDiv.append(secondInnerInnerDiv);

  const d = document.createElement("p");
  d.innerText = desc;
  secondInnerInnerDiv.append(d);

  var token = document.createElement("div");
  token.classList.add("col-md-2");
  var token2 = document.createElement("div");
  token2.classList.add("row");
  token.append(token2);
  const tok = document.createElement("h4");
  tok.classList.add("tokens");
  tok.innerText = tokens + " token(s)";
  token2.append(tok);

  secondInnerDiv.append(token);

  var accept = document.createElement("div");
  accept.classList.add("row");
  var button = document.createElement("button");
  button.classList.add("btn", "btn-primary", "btn-md", "mt-3");
  button.setAttribute("id", "post");
  button.setAttribute("type", "submit");
  button.innerText = "Accept";
  button.addEventListener("click", async function() {
    const signupObj = new Crud('signup_db')
    let username = localStorage.getItem("curr_user")
    let post_id = localStorage.getItem("curr_post_id")

    let userData = await signupObj.readDoc(username);
    userData.acceptedPosts.push(post_id);
    signupObj.updateDoc(username, { acceptedPosts: userData.acceptedPosts })
    userData = await signupObj.readDoc(username);
  })
  token.append(accept);
  accept.append(button);

  element.appendChild(outer);
  // outer.appendChild(firstInnerDiv);
  element.appendChild(secondInnerDiv)
}
/*
<div class="row mt-3">
      <div class="col-md-4">
        <input id="title" class="form-control form-control-lg" type="text" placeholder="Title">
      </div>
</div>
<div class="row mt-3">
  <div class="col-md-8">
    <textarea class="form-control" id="description" rows="10" placeholder="Description"></textarea>
  </div>
  <div class="col-md-2">
    <div class="row">
      <h4 class="tokens"><strong>Tokens: 35</strong></h4>
    </div>
    <div class="row">
      <button id="post" class="btn btn-primary btn-md mt-3" type="submit">Accept</button>
    </div>
  </div>
</div>
*/

window.addEventListener("load", async function() {
  try
  {
    let username = localStorage.getItem("curr_user")
    let post_id = localStorage.getItem("curr_post_id")
    console.log(post_id)
    // let desired_post = await readPost(post_id);
    let response = await fetch('/posts', {
      method: 'GET'
    });
    let posts = await response.json();
    let desired_post = null;
    for(let post of posts)
    {
      if(post["_id"] === post_id)
      {
        desired_post = post;
        break;
      }
    }
    console.log(desired_post)
    let title = desired_post.post_title;
    let desc = desired_post.post_description
    let tokens = desired_post.tokens
    addChildren(document.getElementById("dynamic-start"), title, desc, tokens);
  }
  catch(error)
  {
    console.log("ERROR IN GETTING POST DATA: ", error);
  }
});