const acceptButton = document.getElementById('accept-finish');
const userElement = document.getElementById('username');
const path = window.location.pathname;
const post_id = path.substring(path.lastIndexOf('/')+1);
const curr_user = localStorage.getItem('curr_user');

// call it again?
const response1 = await fetch(`/posts/post/${post_id}`, {
  method: 'GET'
});

const post = await response1.json();

// replace text of accept button with Finish
if (post['profile_id'] === curr_user) {
  document.getElementById('accept-finish').textContent = 'Finish';
}

// fetch username
async function getUser(id){
  const response = await fetch(`/profiles/${id}`, {method: 'GET'});
  const user = await response.json();
  return user.user_name;
}

userElement.innerText = `@${await getUser(post.profile_id)}`; 
userElement.addEventListener("click", () => {
  localStorage.setItem("profile_view_id", post.profile_id);
  window.location.assign('../profile.html');
});

acceptButton.addEventListener('click', async () => {
  // replace button with finish
  if (post['profile_id'] === curr_user) {

    const pack = { 
      post_id: post_id
    };

    const response = await fetch('/postFinished', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pack)
    });

    const data = await response.json();
    alert(data.message);
    if(data.status === 'success') { window.location.assign('../search.html'); } // redirect on success
  }

  else {
    const pack = { 
      post_id: post_id, 
      accept_id: curr_user 
    };

    const response = await fetch('/postAccepted', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pack)
    });

    const data = await response.json();
    alert(data.message);
    if(data.status === 'success') { window.location.assign('../search.html'); } // redirect on success
  }
});