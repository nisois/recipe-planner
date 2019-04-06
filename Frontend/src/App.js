import React, { Component } from "react";
import "./App.css";
import { DailyRecipe } from "./Containers/oneDayRecipe";
import WeekRecipes from "./Containers/weekRecipes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: {
        title: "Salade de pâtes à l'italienne",
        url:
          "https://www.ricardocuisine.com/recettes/498-salade-de-pates-a-l-italienne",
        tags: ["pp", "meat", "30min"],
        comment: "blabla"
      },
      side: {
        title: "Salade de kale façon salade de chou",
        url:
          "https://www.ricardocuisine.com/recettes/6584-salade-de-kale-facon-salade-de-chou",
        tags: ["side", "vege", "30min"],
        comment: "blabla"
      },
      dayOfWeek: "Monday"
    };
  }
  render() {
    return <WeekRecipes />;
  }
}

export default App;
