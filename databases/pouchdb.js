const PouchDB = require('pouchdb');

const db = new PouchDB('mydb');

async function createDoc(doc)
{
  try 
  {
    const response = await db.put(doc);
    console.log('Document created: ', response);
  } 
  catch(err) 
  {
    console.error('Failed to create document: ', err);
  }
}

async function readDoc(docID)
{
  try 
  {
    const doc = await db.get(docID);
    console.log('Document retrieved: ', doc);
  } 
  catch(err) 
  {
    console.error('Failed to retrieve document: ', err);
  }
}

async function updateDoc(docID, data)
{
  try 
  {
    const doc = await db.get(docID);
    Object.assign(doc, data);
    const response = await db.put(doc);
    console.log('Document updated: ', response);
  } 
  catch(err) 
  {
    console.error('Failed to update document: ', err);
  }
}

async function deleteDoc(docID)
{
  try 
  {
    const doc = await db.get(docID);
    const response = await db.remove(doc);
    console.log('Document deleted: ', response);
  } 
  catch(err) 
  {
    console.error('Failed to delete document: ', err);
  }
}

// let doc = {
//   _id: "uid",
//   head: "Test Document",
//   body: "Some stuff!"
// }

// createDoc(doc);
// let stored = readDoc("uid");
// console.log(stored);
// updateDoc("uid", { hobby: "cooking" });
// stored = readDoc("uid");
// console.log(stored);