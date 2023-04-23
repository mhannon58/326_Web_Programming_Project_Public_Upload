const PouchDB = require('pouchdb');
const profileData = require('./mock_profile.json')

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

let user = profileData[0];

let doc = {
  _id: user.id.toString(),
  firstName: user.first_name,
  lastName: user.last_name,
  email: user.email,
  gender: user.gender,
  ip: user.ip_address
}

async function output()
{
  await createDoc(doc);
  let stored = await readDoc("1");
  await updateDoc("1", { gender: "male" });
  stored = await readDoc("1");
  await deleteDoc("1");
  // stored = await readDoc("1");
}

output()