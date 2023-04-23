
console.log("intro")
const postdb = new PouchDB('Posts');

postdb.info().then(function (info) {
    console.log(info);
})

//createPost("post3", "example", "This is an example", ["example"], 6)

async function createPost(id, title, description, tags, tokens){

    let post = {Title: title,
         Description: description, 
         Tags: tags, 
         Tokens: tokens,
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
      return doc
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




