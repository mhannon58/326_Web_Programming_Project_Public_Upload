import { loadProfiles, loadPosts } from "./load.js";
import {otherProfileName} from "./profile.js"

async function setup() {
  const profiles = await loadProfiles();
  const posts = await loadPosts();
  const profile = await profiles.get('1');

  console.log(profile);

  // set profile name
  const profileName = document.getElementById('full-name');
  profileName.textContent = `${profile.first_name} ${profile.last_name}`;

  // set email
  const email = document.getElementById('email');
  email.textContent = profile.email;

}

// need to be able to read the mock_profiles
try {
  // get profile document number 1
  // aka jeremias
  setup();
  console.log(otherProfileName)

} catch (err) {
  console.log(err);
}
