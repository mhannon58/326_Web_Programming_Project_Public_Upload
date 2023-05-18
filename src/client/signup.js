let registerButton = document.getElementById("register-button");

registerButton.addEventListener("click", async function() {
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let doc = {
    username: username,
    email: email,
    password: password
  };
  
  const response = await fetch("/register-checker", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(doc)
  });

  let check = await response.json();
  
  if(check)
  {
    doc = {
      user_name: username,
      email: email,
      password: password
    };

    await fetch("/profiles", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(doc)
    });
    window.location.replace("./login");
  }
  else
  {
    window.location.replace("./register");
  }
});