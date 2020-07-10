const express = require("express");
const Joi = require("joi");

const app = express();
app.use(express.json());

const genres = [
  { id: 1, title: "horror" },
  { id: 2, title: "fiction" },
  { id: 3, title: "action" },
];

//Validation of adding new genre
function validation(genre) {
  const schema = {
    title: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

//Get all genres
app.get("/api/genres", (req, res) => {
  res.send(genres);
});

//Get genre by Id
app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send(`Dont have genre with id ${req.params.id}`);
  res.send(genre);
});

//Add new genre
app.post("/api/genres", (req, res) => {
  const newGenre = {
    id: genres.length + 1,
    title: req.body.title,
  };

  const result = validation(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  genres.push(newGenre);
  res.send(newGenre);
});

//Update current genre
app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
  if (!genre)
    return res.status(400).send(`Dont have genre with id ${req.params.id}`);

  const result = validation(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  genre.title = req.body.title;
  res.send(genre);
});

//Delete genre
app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
  if (!genre)
    return res.status(400).send(`Dont have genre with id ${req.params.id}`);

  genres.splice(genres.indexOf(genre), 1);
  res.send(genre);
});

//Listening port
const port = process.env.port || 4447;
app.listen(port, () => console.log(`Listenning port ${port}`));
