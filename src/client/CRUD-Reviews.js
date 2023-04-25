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

//_init_()

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
        const docs = await reviewdb.allDocs({include_docs: true});
        console.log(docs)
        return docs
    }catch(err){
        console.log("an error occurred")
    }
}

export{getAllReviews, deleteReview, readReview, createReview, updateReview, getNextId, _init_ }