const express = require("express");
const Joi = require("joi");
const genresRouter = require("./genres");
const mainRouter = require("./main");

const app = express();
app.use(express.json());
app.use("/api/genres", genresRouter);
app.use("", mainRouter);

//Listening port
const port = process.env.port || 4449;
app.listen(port, () => console.log(`Listenning port ${port}`));
