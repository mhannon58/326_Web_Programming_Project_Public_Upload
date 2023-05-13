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
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
run().catch(console.dir);

// POST request to create a new post, using the JSON body on the request
router.post("/posts", async (req, res) => {
  const { post_title, post_description, post_tags, profile_id, tokens, deadline, finished } = req.body;

  try {
    const result = await client.db("db").collection("posts").insertOne({
      post_title: post_title,
      post_description: post_description,
      post_tags: post_tags, 
      profile_id: profile_id, 
      accept_id: null,
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
    res.status(200).send(result.insertedId);
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

// GET request to return all posts
router.get("/posts", async (req, res) => {
  const data = await this.client.db("db").collection("posts").find().toArray();

  res.status(200).send(data);
});

// GET request to return specific post
router.get("/posts/:postID", async (req, res) => {
  const post = await client.db("db").collection("posts").findOne(req.params.postID);

  // post not found
  if (!post) {
    res.status(500).send("Post not found.");
  }
  else {
    res.status(200).send(post);
  }
});

// GET request to return specific profile
router.get("/profiles/:profileID", async (req, res) => {
  const profile = await client.db("db").collection("profiles").findOne(req.params.profileID);

  // post not found
  if (!profile) {
    res.status(500).send("Profile not found.");
  }
  else {
    res.status(200).send(profile);
  }
});

// GET request to return specific profile by email
router.get("/profiles/:email", async (req, res) => {
  const profile = await client.db("db").collection("profiles").findOne(req.params.email);

  // post not found
  if (!profile) {
    res.status(500).send("Profile not found.");
  }
  else {
    res.status(200).send(profile);
  }
});

// GET request to return all posts specific to profile
router.get("/reviews/:revieweeID", async (req, res) => {
  const data = await this.client.db("db").collection("reviews").find({ "reviewee": revieweeID }).toArray();

  res.status(200).send(data);
});

// GET request to return specific post
router.get("/reviews/:reviewID", async (req, res) => {
  const review = await client.db("db").collection("reviews").findOne(req.params.reviewID);

  // post not found
  if (!review) {
    res.status(500).send("Review not found.");
  }
  else {
    res.status(200).send(review);
  }
});

// PUT request to mark post as finished 
router.put("/postAccepted", async (req, res) => {
  const { post_id, accept_id } = req.body;

  try {
    const post = await client.db("db").collection("posts").findOne({
      "_id": post_id
    });

    // post has already been accepted
    if (post.accept_id) {
      console.log(`Failure to accept listing with id ${post_id}; post has already been accepted by user ${post.accept_id}`);
      res.status(200).send({ status: "failure" });
      return;
    }

    // update post
    const update = { $set: { accept_id: accept_id } };
    await client.db("db").collection("posts").updateOne({"_id": post_id}, update);

    console.log(`Listing with id ${post_id} has been accepted by user ${accept_id}`);
    res.status(200).send({ status: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

export default router;
