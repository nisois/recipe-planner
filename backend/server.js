const express = require("express");
const cors = require("cors");
import { recipes, connect } from "../backend/helpers/db-helper";

let app = express();
app.use(cors());
app.use(express.json());
connect();

app.post("/addRecipe", async function(req, res) {
  console.log(req.body);
  let newRecipe = {
    name: req.body.title,
    url: req.body.url,
    tags: req.body.tags,
    comment: req.body.comment
  };
  let db = await recipes();
  db.insertOne(newRecipe, (err, result) => {
    if (err) return res.status(500).send(err);
  });
  return res.status(200).send({ success: true });
});

app.get("/allRecipe", function(req, res) {
  res.send("Hello world!");
});

app.listen(4000, function() {
  console.log("Server started on port 4000");
});
