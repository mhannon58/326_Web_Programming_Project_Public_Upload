import express from "express";
import PouchDB from "pouchdb";

const router = express.Router();

let db = new PouchDB("posts");

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

// POST request to create a new post and add it to the PouchDB database, using the JSON body on the request
router.post("/posts", async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = await db.post({
      title: title,
      content: content,
    });

    res.send(`Successfully created post with ID ${newPost.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// DELETE request to destroy and recreate our database, effectively deleting all documents and starting fresh
router.delete("/posts", async (req, res) => {
  await db.destroy();
  db = new PouchDB("posts");
});

// OPTIONAL TODO
// Add an update feature to the posts. This can be anything you want, be creative! This would complete the CRUD operations offered in the application

router.put("", async (req, res) => {
  res.send();
});

export default router;
