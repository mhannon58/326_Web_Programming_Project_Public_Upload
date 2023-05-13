import express from "express";
import logger from "morgan";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Use the logger middleware to easily log every HTTP request to our server
app.use(logger("dev"));

// Support JSON on requests
app.use(express.json());

app.use(express.static("326-project-repo-team-44/"));

app.get('/',function(req,res) {
  res.sendFile('src/client/home.html', {root: './326-project-repo-team-44'});
});

app.get('/search.html',function(req,res) {
  res.sendFile('src/client/search.html', {root: './326-project-repo-team-44'});
});

app.get('/search.html',function(req,res) {
  res.sendFile('src/client/search.html', {root: './326-project-repo-team-44'});
});

app.get('/create-post.html',function(req,res) {
  res.sendFile('src/client/create-post.html', {root: './326-project-repo-team-44'});
});

app.get('/create-review.html',function(req,res) {
  res.sendFile('src/client/create-review.html', {root: './326-project-repo-team-44'});
});

app.get('/history.html',function(req,res) {
  res.sendFile('src/client/history.html', {root: './326-project-repo-team-44'});
});

app.get('/listing.html',function(req,res) {
  res.sendFile('src/client/listing.html', {root: './326-project-repo-team-44'});
});

app.get('/login.html',function(req,res) {
  res.sendFile('src/client/login.html', {root: './326-project-repo-team-44'});
});

app.get('/profile-reviews.html',function(req,res) {
  res.sendFile('src/client/profile-reviews.html', {root: './326-project-repo-team-44'});
});

app.get('/profile.html',function(req,res) {
  res.sendFile('src/client/profile.html', {root: './326-project-repo-team-44'});
});

app.get('/signup.html',function(req,res) {
  res.sendFile('src/client/signup.html', {root: './326-project-repo-team-44'});
});

app.get('/navbar.html',function(req,res) {
  res.sendFile('src/client/navbar.html', {root: './326-project-repo-team-44'});
});

// Use static middleware to serve our post html page and associated script when making a GET request to "/post"
app.use("/post", express.static("src/client/post"));

// Send the post html when accessing a post with a specific id through "/post/:postId"
app.get("/post/:postId", (req, res) => {
  res.sendFile("./src/client/post/index.html", { root: "./" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
