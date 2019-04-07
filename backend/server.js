const express = require("express");
const cors = require("cors");
import { recipes, connect } from "../backend/helpers/db-helper";

let app = express();
app.use(cors());
app.use(express.json());
connect();

app.post("/addRecipe", async function(req, res) {
  let newRecipe = {
    title: req.body.title,
    type: req.body.type,
    url: req.body.url,
    tags: req.body.tags,
    comment: req.body.comment
  };
  let db = await recipes();
  db.insertOne(newRecipe, (err, result) => {
    if (err) return res.status(500).send(err);
  });
  return res
    .status(200)
    .send({ success: true, message: "Recipe successfully added" });
});

app.get("/allRecipes", async function(req, res) {
  const foundRecipes = await recipes()
    .find()
    .toArray();

  return res.status(200).send(foundRecipes);
});

app.get("/getSides", async function(req, res) {
  const allSideRecipes = await recipes()
    .aggregate([
      {
        $match: {
          type: "side"
        }
      },
      { $sample: { size: 7 } }
    ])
    .toArray();

  return res.status(200).send(allSideRecipes);
});

app.get("/getMeals", async function(req, res) {
  const allMealRecipes = await recipes()
    .aggregate([
      {
        $match: {
          type: "meal"
        }
      },
      { $sample: { size: 7 } }
    ])
    .toArray();

  return res.status(200).send(allMealRecipes);
});

app.listen(4000, function() {
  console.log("Server started on port 4000");
});
