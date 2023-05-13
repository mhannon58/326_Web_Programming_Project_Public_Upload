import express from "express";

const router = express.Router();

import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://team-44:123password123@team-44.3xrj2rq.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  //try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  //} //finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  //}
}
run().catch(console.dir);

// GET request to return all documents in our PouchDB database
router.get("/posts", async (req, res) => {
  let posts = await db.allDocs({
    include_docs: true,
    attachments: true,
  });

  res.send(posts.rows);
});

// GET request to return a post specified by id in the url params
router.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;

  const post = await db.get(postId);

  res.send(post);
});

// POST request to create a new post, using the JSON body on the request
router.post("/posts", async (req, res) => {
  const { post_title, post_description, post_tags, profile_id, accept_id, tokens, deadline, finished } = req.body;

  try {
    const result = await client.db("db").collection("posts").insertOne({
      post_title: post_title,
      post_description: post_description,
      post_tags: post_tags, 
      profile_id: profile_id, 
      accept_id: accept_id,
      tokens: tokens,
      deadline: deadline,
      finished: finished
    });
    console.log(`New listing created with the following id: ${result.insertedId}`);
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// POST request to create a new profile, using the JSON body on the request
router.post("/profiles", async (req, res) => {
  const { user_name, email, tokens, password } = req.body;

  try {
    const result = await client.db("db").collection("profiles").insertOne({
      user_name: user_name,
      email: email, 
      tokens: tokens,
      password: password
    });
    console.log(`New profile created with the following id: ${result.insertedId}`);
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// POST request to create a new review, using the JSON body on the request
router.post("/reviews", async (req, res) => {
  const { title, description, reviewer, reviewee } = req.body;

  try {
    const result = await client.db("db").collection("reviews").insertOne({
      title: title,
      description: description, 
      reviewer: reviewer,
      reviewee: reviewee
    });
    console.log(`New review created with the following id: ${result.insertedId}`);
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});





export default router;
