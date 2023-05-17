const acceptButton = document.getElementById('post');


acceptButton.addEventListener('click', async () => {
  const path = window.location.pathname;
  const post_id = path.substring(path.lastIndexOf('/')+1);
  const accept_id = localStorage.getItem('curr_user');
  const pack = { 
    post_id: post_id, 
    accept_id: accept_id 
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

});