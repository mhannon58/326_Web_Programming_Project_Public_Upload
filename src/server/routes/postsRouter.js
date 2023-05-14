import express from "express";

const router = express.Router();

import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

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
  const { post_title, post_description, post_tags, profile_id, tokens, deadline } = req.body;

  try {
    // check if profile has enough tokens and then subtract from balance
    const profile = await client.db("db").collection("profiles").findOne(new ObjectId(profile_id));

    // profile not found
    if (!profile) {
      res.status(500).send("Profile not found.");
      return;
    }

    // post requires more tokens than user has
    if (tokens > profile.tokens) {
      res.status(500).send("Not enough tokens.");
      return;
    }

    const update = { $set: { tokens: profile.tokens - tokens } };
    await client.db("db").collection("profiles").updateOne({ "_id": new ObjectId(profile_id) }, update);

    const result = await client.db("db").collection("posts").insertOne({
      post_title: post_title,
      post_description: post_description,
      post_tags: post_tags, 
      profile_id: profile_id, 
      accept_id: null,
      tokens: tokens,
      deadline: deadline,
      finished: false
    });

    console.log(`New listing created with the following id: ${result.insertedId}`);
    console.log(`Profile ${profile_id}'s new token amount is ${profile.tokens - tokens}`);
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// POST request to create a new profile, using the JSON body on the request
// give 100 tokens to each user
router.post("/profiles", async (req, res) => {
  const { user_name, email, password } = req.body;

  try {
    // make sure that user_name and email are unique
    let notUnique = await client.db("db").collection("profiles").findOne({ user_name: user_name });
    if (notUnique) {
      console.log(`Username ${user_name} is not unique.`);
      res.status(500).send();
      return;
    }
    notUnique = await client.db("db").collection("profiles").findOne({ email: email });
    if (notUnique) {
      console.log(`Email ${email} is not unique.`);
      res.status(500).send();
      return;
    }

    const result = await client.db("db").collection("profiles").insertOne({
      user_name: user_name,
      email: email, 
      tokens: 100,
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
  const data = await client.db("db").collection("posts").find().toArray();

  res.status(200).send(data);
});

// GET request to return all posts posted by user
router.get("/posts/posted/:profileID", async (req, res) => {
  const data = await client.db("db").collection("posts").find({"profile_id": req.params.profileID}).toArray();

  res.status(200).send(data);
});

// GET request to return all posts accepted by user
router.get("/posts/accepted/:profileID", async (req, res) => {
  const data = await client.db("db").collection("posts").find({"accept_id": req.params.profileID}).toArray();

  res.status(200).send(data);
});

// GET request to return specific post
router.get("/posts/:postID", async (req, res) => {
  try {
    const post = await client.db("db").collection("posts").findOne(new ObjectId(req.params.postID));

    // post not found
    if (!post) {
      res.status(500).send("Post not found.");
    }
    else {
      res.status(200).send(post);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// GET request to return specific profile
router.get("/profiles/:profileID", async (req, res) => {
  try {
    const profile = await client.db("db").collection("profiles").findOne(new ObjectId(req.params.profileID));

    // profile not found
    if (!profile) {
      res.status(500).send("Profile not found.");
    }
    else {
      res.status(200).send(profile);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// GET request to return specific profile by email
router.get("/profiles/email/:email", async (req, res) => {
  const profile = await client.db("db").collection("profiles").findOne({email: req.params.email});

  // profile not found
  if (!profile) {
    res.status(500).send("Profile not found.");
  }
  else {
    res.status(200).send(profile);
  }
});

// GET request to return specific profile by username
router.get("/profiles/username/:username", async (req, res) => {
  const profile = await client.db("db").collection("profiles").findOne({user_name: req.params.username});

  // profile not found
  if (!profile) {
    res.status(500).send("Profile not found.");
  }
  else {
    res.status(200).send(profile);
  }
});

// GET request to return all posts specific to profile
router.get("/reviews/:revieweeID", async (req, res) => {
  const data = await client.db("db").collection("reviews").find({ "reviewee": req.params.revieweeID }).toArray();

  res.status(200).send(data);
});

// GET request to return specific post
router.get("/reviews/review/:reviewID", async (req, res) => {
  try {
    const review = await client.db("db").collection("reviews").findOne(new ObjectId(req.params.reviewID));

    // review not found
    if (!review) {
      res.status(500).send("Review not found.");
    }
    else {
      res.status(200).send(review);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// PUT request to mark post as accepted 
router.put("/postAccepted", async (req, res) => {
  const { post_id, accept_id } = req.body;

  try {
    const post = await client.db("db").collection("posts").findOne(new ObjectId(post_id));

    if (!post) {
      console.log(`Could not find post with id ${post_id}`);
      res.status(500).send();
      return;
    }

    // post has already been finished
    if (post.finished) {
      console.log(`Post ${post_id} has already been finished`);
      res.status(200).send({ status: "failure" });
      return;
    }

    // post has already been accepted
    if (post.accept_id) {
      console.log(`Failure to accept listing with id ${post_id}; post has already been accepted by user ${post.accept_id}`);
      res.status(200).send({ status: "failure" });
      return;
    }

    // update post
    const update = { $set: { accept_id: accept_id } };
    await client.db("db").collection("posts").updateOne({ "_id": new ObjectId(post_id) }, update);

    console.log(`Listing with id ${post_id} has been accepted by user ${accept_id}`);
    res.status(200).send({ status: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// PUT request to mark post as finished 
router.put("/postFinished", async (req, res) => {
  const { post_id } = req.body;

  try {
    const post = await client.db("db").collection("posts").findOne(new ObjectId(post_id));

    if (!post) {
      console.log(`Could not find post with id ${post_id}`);
      res.status(500).send();
      return;
    }

    // post has already been finished
    if (post.finished) {
      console.log(`Post ${post_id} has already been finished`);
      res.status(200).send({ status: "failure" });
      return;
    }

    // a person has accepted the post
    // transfer the tokens from user A to B
    if (post.accept_id) {
      const user = await client.db("db").collection("profiles").findOne(new ObjectId(post.accept_id));

      if (!user) {
        console.log(`User ${post.accept_id} not found. Could not mark post as finished.`);
        res.status(500).send({ status: "failure" });
        return;
      }

      console.log(`Mark post ${post_id} as finished`);

      let update = { $set: { finished: true } };
      await client.db("db").collection("posts").updateOne({ "_id": new ObjectId(post_id) }, update);

      update = { $set: { tokens: user.tokens + post.tokens } };
      await client.db("db").collection("profiles").updateOne({ "_id": new ObjectId(post.accept_id) }, update);
    }

    // noone accepted the post
    // return tokens to user
    else {
      const user = await client.db("db").collection("profiles").findOne(new ObjectId(post.profile_id));

      if (!user) {
        console.log(`User ${post.profile_id} not found. Could not mark post as finished.`);
        res.status(500).send({ status: "failure" });
        return;
      }

      console.log(`Mark post ${post_id} as finished`);

      let update = { $set: { finished: true } };
      await client.db("db").collection("posts").updateOne({ "_id": new ObjectId(post_id) }, update);

      update = { $set: { tokens: user.tokens + post.tokens } };
      await client.db("db").collection("profiles").updateOne({ "_id": new ObjectId(post.profile_id) }, update);
    }

    res.status(200).send({ status: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// TODO add delete to router

export default router;
