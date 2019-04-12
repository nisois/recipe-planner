const express = require("express");
const cors = require("cors");
import { recipes, connect, user } from "../backend/helpers/db-helper";
import { ObjectId } from "mongodb";

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

app.get("/getUser", async function(req, res) {
  const foundUser = await user().findOne({ userId: req.query.userId });

  return res.status(200).send(foundUser);
});

app.post("/updateUserRecipes", async function(req, res) {
  console.log(req.body);
  let userData = {
    userId: req.body.userId,
    userRecipes: {
      meals: req.body.meals,
      sides: req.body.sides
    }
  };
  let db = await user();
  db.findOneAndUpdate(
    { userId: req.body.userId },
    { $set: { userRecipes: userData.userRecipes } },
    (error, result) => {
      if (error) {
        db.insertOne(userData, (err, result) => {
          if (err) return res.status(500).send(err);
        });
        return res.status(200).send({ success: true });
      }
    }
  );
});

app.get("/getSides", async function(req, res) {
  let allSideRecipes = [];
  if (req.query.sideIds) {
    let ids = req.query.sideIds.split(",").map(id => ObjectId(id));
    allSideRecipes = await recipes()
      .aggregate([
        {
          $match: {
            type: "Side",
            _id: { $nin: ids }
          }
        },
        { $sample: { size: 7 } }
      ])
      .toArray();
  } else {
    allSideRecipes = await recipes()
      .aggregate([
        {
          $match: {
            type: "Side"
          }
        },
        { $sample: { size: 7 } }
      ])
      .toArray();
  }

  return res.status(200).send(allSideRecipes);
});

app.get("/getMeals", async function(req, res) {
  let allMealRecipes = [];
  if (req.query.mealIds) {
    let ids = req.query.mealIds.split(",").map(id => ObjectId(id));
    allMealRecipes = await recipes()
      .aggregate([
        {
          $match: {
            type: "Meal",
            _id: {
              $nin: ids
            }
          }
        },
        { $sample: { size: 7 } }
      ])
      .toArray();
  } else {
    allMealRecipes = await recipes()
      .aggregate([
        {
          $match: {
            type: "Meal"
          }
        },
        { $sample: { size: 7 } }
      ])
      .toArray();
  }
  return res.status(200).send(allMealRecipes);
});

app.listen(4000, function() {
  console.log("Server started on port 4000");
});
