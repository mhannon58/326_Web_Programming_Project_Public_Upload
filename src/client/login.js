let loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", async function() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let doc = {
    username: username,
    password: password
  };
  
  fetch("/login-checker", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(doc)
  })
  .then(response => response.json())
  .then(async response => {
    if(response.success) 
    {
      let route = "/profiles/username/" + username;
      const response = await fetch(route, {
          method: 'GET'
      });
      const profile = await response.json();
      localStorage.setItem("curr_user", profile._id);
      window.location.replace("/search.html");
    } 
    else 
    {
      window.location.replace("/login");
    }
  })
  .catch(error => {
    console.error('ERROR:', error);
  });
});