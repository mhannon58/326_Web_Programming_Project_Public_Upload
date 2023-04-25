let postdb = new PouchDB('Posts')
let generaldb = new PouchDB('General')
let reviewdb = new PouchDB('Reviews')


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

async function createReview(id, title, description){

    let post = {Title: title,
          Description: description, 
        _id: id}
  
    try {
        const response = await reviewdb.put(post);
        console.log('Document created: ', response);
    } catch(err) {
        console.error('Failed to create document: ', err);
    }
      
  } 
async function readReview(id){
    try 
    {
    const doc = await reviewdb.get(id);
    console.log('Document retrieved: ', doc);
    return await doc
    } 
    catch(err) 
    {
    console.error('Failed to retrieve document: ', err);
    }
}

async function updateReview(id, data){
try 
{
    const doc = await reviewdb.get(id);
    Object.assign(doc, data);
    const response = await reviewdb.put(doc);
    console.log('Document updated: ', response);
} 
catch(err) 
{
    console.error('Failed to update document: ', err);
}
}
async function deleteReview(id){
    try 
    {
    const doc = await reviewdb.get(id);
    const response = await reviewdb.remove(doc);
    console.log('Document deleted: ', response);
    } 
    catch(err) 
    {
    console.error('Failed to delete document: ', err);
    }
}

async function getAllReviews(){
    try{
        const docs = await reviewdb.allDocs();
        console.log(docs)
        return docs
    }catch(err){
        console.log("an error occurred")
    }
}

function populateReview(element){
    var firstDiv = document.createElement("div");
    firstDiv.classList.add("card")
    firstDiv.classList.add("mb-4")

    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body")

    var firstRow = document.createElement("div");
    firstRow.classList.add("row")
    firstRow.classList.add("mb-4")


    var secondDiv = document.createElement("div");
    secondDiv.classList.add("col-sm-10")

    var head3 = document.createElement("h3")
    head3.classList.add("mb-0")

    var title = document.createElement("a")
    title.innerHTML = "<a> This is an example </a>"

    var desc = document.createElement("p")
    desc.classList.add("mb-0")
    desc.innerHTML = "<p> This is a place holderThis is a place holderThis is a place holderThis is a place holderThis is a place holderThis is a place holderThis is a place holder </p>"

    firstDiv.appendChild(cardBody)
    cardBody.appendChild(firstRow)
    firstRow.appendChild(secondDiv)
    secondDiv.appendChild(head3)
    head3.appendChild(title)

    element.appendChild(firstDiv)
    cardBody.appendChild(desc)
}

const postTitle = document.getElementById('title');
const postContent = document.getElementById('description');
const postButton = document.getElementById('post')
const reviewLoc = document.getElementById('reviews')

console.log(reviewLoc)
populateReview(reviewLoc)

postButton.addEventListener('click', () => {
    const title = postTitle.value;
    const desc = postContent.value;

    // check for missing fields
    if (!title) {
        alert('Title required.');
    }
    else if (!desc) {
        alert('Description required.');
    }
    else {
        // create post here
        alert(`${title} ${desc}`);
      
        getNextId().then(id => {
            const id_string = "review" + id.toString();

            console.log("The id we are about to post is", id);
            createReview(id_string, title, desc);
        });
        
    }
});

// TODO: add save button functionality

