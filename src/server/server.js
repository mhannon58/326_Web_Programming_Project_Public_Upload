//code from lab 9

import express from "express";
import logger from "morgan";
import postRouter from "./routes/postsRouter.js";

const app = express();

const port = 3000;

app.use(logger("dev"));

app.use(express.json());

app.use(express.static("src/client"));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
