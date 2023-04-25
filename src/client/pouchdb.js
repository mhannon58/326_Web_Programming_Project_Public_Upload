export class Crud
{
  constructor(dbName)
  {
    this.db = new PouchDB(dbName);
  }

  async createDoc(doc)
  {
    try 
    {
      const response = await this.db.put(doc);
      console.log('Document created: ', response);
    } 
    catch(err)
    {
      console.error('Failed to create document: ', err);
    }
  }

  async readDoc(docID)
  {
    try 
    {
      const doc = await this.db.get(docID);
      console.log('Document retrieved: ', doc);
      return doc;
    } 
    catch(err)
    {
      console.error('Failed to retrieve document: ', err);
    }
  }

  async updateDoc(docID, data)
  {
    try 
    {
      const doc = await this.db.get(docID);
      Object.assign(doc, data);
      const response = await this.db.put(doc);
      console.log('Document updated: ', response);
    } 
    catch(err)
    {
      console.error('Failed to update document: ', err);
    }
  }

  async deleteDoc(docID)
  {
    try 
    {
      const doc = await this.db.get(docID);
      const response = await this.db.remove(doc);
      console.log('Document deleted: ', response);
    } 
    catch(err)
    {
      console.error('Failed to delete document: ', err);
    }
  }

  async getAllDocs()
  {
    try 
    {
      const response = await this.db.allDocs({include_docs: true});
      console.log('All documents retrieved: ', response);
      return response;
    } 
    catch(err)
    {
      console.error('Failed to retrieve documents: ', err);
    }
  }
}