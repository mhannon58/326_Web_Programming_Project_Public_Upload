//code from lab 9

import express from "express";
import logger from "morgan";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const port = 3000;

app.use(logger("dev"));

app.use(express.json());

app.use(express.static("326-project-repo-team-44/"));

app.get('/',function(req,res) {
  res.sendFile('src/client/home.html', {root: './326-project-repo-team-44'});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
