// add mock_posts and mock_profile to pouchDB if they do not exist

async function loadPosts() {
  const db = new PouchDB('posts');
  const response = await fetch('/data/mock_posts.json');
  const posts = await response.json();

  console.log(posts);

  db.bulkDocs(posts)
    .then(function (result) {
      console.log('Mock data stored successfully!');
    })
    .catch(function (err) {
      console.log('Error storing mock data: ' + err);
    });

  return db;
}

async function loadProfiles() {
  const db = new PouchDB('profiles');
  const response = await fetch('/data/mock_profile.json');
  const profiles = await response.json();

  console.log(profiles);

  db.bulkDocs(profiles)
    .then(function (result) {
      console.log('Mock profiles stored successfully!');
    })
    .catch(function (err) {
      console.log('Error storing mock profiles: ' + err);
    });
  
  return db;  
}

export { loadPosts, loadProfiles };