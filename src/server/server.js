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

app.get('/', (req, res) => {
  res.sendFile('src/client/home.html', {root: './326-project-repo-team-44'});
});

app.use(express.static("326-project-repo-team-44/src/client"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
