// TODO how to determine if user is logged in or not???
function initNavbar() {
    const searchField = document.getElementById('search-field');
    const searchButton = document.getElementById('search-btn');
    const profileIcon = document.getElementById('profile');

    // TODO implement search functionality
    searchButton.addEventListener('click', () => {
        const text = searchField.value;
        
        // send search query to server

        // server will return results

        // switch to results page

        alert(`You searched ${text}.`);
        document.getElementById('link').setAttribute("href", `search.html?${text}`);
    });
    searchField.addEventListener('keydown', (e) => {if(e.key === 'Enter'){ searchButton.click(); }});


    // TODO implement profile functionality
    profileIcon.addEventListener('click', () => {
        // if logged in
        // display user's profile icon
        // when clicked, bring to profile page

        // if not logged in
        // we need to display a generic profile icon
        // or a login button
        // when clicked, bring to login page

        alert('Profile clicked');
        window.location = "profile.html";
    });
}

initNavbar();