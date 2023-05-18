import express from "express";
import expressSession from 'express-session';
import logger from "morgan";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import users from './users.js';
import auth from './auth.js';
import postRouter from "./routes/postsRouter.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

const app = express();
const port = process.env.PORT || 3000;

// Session configuration
const sessionConfig = {
  // set this encryption key in Heroku config (never in GitHub)!
  secret: process.env.SECRET || 'SECRET',
  resave: false,
  saveUninitialized: false,
};

app.use(expressSession(sessionConfig));
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

auth.configure(app);

function checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    // If we are authenticated, run the next route.
    next();
  } else {
    // Otherwise, redirect to the login page.
    res.redirect('/login');
  }
}

app.get('/', (req, res) => {
  res.redirect('home.html');
});

// Handle the URL /login (just output the login.html file).
app.get('/login', (req, res) =>
  res.sendFile('client/login.html', { root: __dirname })
);

app.post('/login-checker', auth.authenticate('local'), async (req, res) => {
  if(req.user)
    res.send({ success: true });
  else
    res.send({ success: false });
});

app.get('/register', (req, res) =>
  res.sendFile('client/signup.html', { root: __dirname })
);

app.post('/register-checker', async (req, res) => {
  const { username, email, password } = req.body;
  if(users.addUser(username, email, password)) 
    res.send(true); 
  else 
    res.send(false);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
