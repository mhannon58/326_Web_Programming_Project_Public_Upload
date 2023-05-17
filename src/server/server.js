import express from "express";
import logger from "morgan";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import postRouter from "./routes/postsRouter.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

const app = express();
const port = process.env.PORT || 3000;

// Use the logger middleware to easily log every HTTP request to our server
app.use(logger("dev"));

// Support JSON on requests
app.use(express.json());
// Allow URLencoded data
app.use(express.urlencoded({ extended: true }));
// Allow static file serving
app.use(express.static(__dirname + '/client'));
// Use the routes created for posts, stored neatly in it's own file in routes/posts.js
app.use(postRouter);
// Set views folder for ejs
app.set('views', __dirname + '/views');


app.get('/', (req, res) => {
  res.redirect('home.html');
});

app.get('/login', (req, res) => {
  res.sendFile('client/login.html', {root: __dirname});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
