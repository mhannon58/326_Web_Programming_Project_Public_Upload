let postdb = new PouchDB('Posts')
let generaldb = new PouchDB('General')

postdb.info().then(function (info) {
    console.log(info);
})

function reset_posts() {
    postdb.destroy().then(function() {
      postdb = new PouchDB('Posts');
    });
};

function reset_general() {
    generaldb.destroy().then(function() {
      generaldb = new PouchDB('General');
    });
};

//reset_posts()
//reset_general()



async function _init_(){
    try{
        const doc = await generaldb.get("posting_count")
        console.log("Count has been created",doc)
    }catch(err){
        await generaldb.put({_id:"posting_count", count: 0})
    }
}

async function getNextId(){

    let doc = "placeholder"
    let nextId = 0
    try{
        doc = await generaldb.get("posting_count")
        nextId = doc.count
        console.log("the current id is", doc.count, typeof(doc.count))
    }catch(err){
        console.log("There was an error")
    }

    
    try{
        Object.assign(doc, {count:parseInt(nextId+1)});
        const response = await generaldb.put(doc);
        console.log('IDCount updated: ', response);
    } catch(err) {
        console.error('Failed to update document: ', err);
    }

    return nextId
}

_init_()

generaldb.info().then(function (info) {
    console.log(info);
})



async function createPost(id, title, description, tags, tokens, date){

    let post = {Title: title,
          Description: description, 
          Tags: tags, 
          Tokens: tokens,
          Date: date,
        _id: id}
  
    try {
        const response = await postdb.put(post);
        console.log('Document created: ', response);
    } catch(err) {
        console.error('Failed to create document: ', err);
    }
      
  } 
async function readPost(id){
    try 
    {
    const doc = await postdb.get(id);
    console.log('Document retrieved: ', doc);
    return await doc
    } 
    catch(err) 
    {
    console.error('Failed to retrieve document: ', err);
    }
}

async function updatePost(id, data){
try 
{
    const doc = await db.get(id);
    Object.assign(doc, data);
    const response = await db.put(doc);
    console.log('Document updated: ', response);
} 
catch(err) 
{
    console.error('Failed to update document: ', err);
}
}
async function deletePost(id){
    try 
    {
    const doc = await postdb.get(id);
    const response = await postdb.remove(doc);
    console.log('Document deleted: ', response);
    } 
    catch(err) 
    {
    console.error('Failed to delete document: ', err);
    }
}

async function getAllPosts(){
    try{
        const docs = await postdb.allDocs();
        console.log(docs)
        return docs
    }catch(err){
        console.log("an error occurred")
    }
}

getAllPosts();


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
        getNextId().then(id => {
            const id_string = "post" + id.toString();
            console.log("The id we are about to post is", id);
            createPost(id_string, title, desc, tags, tokens, date) ;
        });

    }
});

// TODO: add save button functionality
