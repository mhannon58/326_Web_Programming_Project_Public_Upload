const postTitle = document.getElementById('title');
const postContent = document.getElementById('description');
const postButton = document.getElementById('post');
const tokenNumber = document.getElementById('tokens');
const deadline = document.getElementById('deadline');
const postTags = document.getElementById('tags');

postButton.addEventListener('click', () => {
    const title = postTitle.value;
    const desc = postContent.value;
    const tokens = tokenNumber.value;
    const date = deadline.value;
    const tags = [...postTags.options].filter(option => option.selected).map(option => option.value);

    // check for missing fields
    if (!title) {
        alert('Title required.');
    }
    else if (!desc) {
        alert('Description required.');
    }
    else if (!tokens) {
        alert('Number of tokens required.');
    }
    else if (tokens < 0) {
        alert('Tokens must be non-negative.');
    }
    else if (!date) {
        alert('Deadline required.');
    }
    // TODO: current date should also be a valid date
    // right now, today is marked as invalid date
    // fix this comparison
    else if (new Date(date) < new Date()) {
        alert('Deadline must be in the future.');
    }
    else {
        // create post here
        alert(`${title} ${desc} ${tokens} ${date}`);
        alert(tags);


    }
});

// TODO: add save button functionality