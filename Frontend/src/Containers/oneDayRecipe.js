import React, { Component } from "react";
import { MealRecipe } from "../Components/MealRecipe";
import { SideRecipe } from "../Components/SideRecipe";
import { Button } from "semantic-ui-react";

class DailyRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealIsShown: true
    };
  }

  showMealRecipe = () => {
    if (!this.state.mealIsShown) {
      this.setState({ mealIsShown: true });
    }
  };

  showSideRecipe = () => {
    if (this.state.mealIsShown) {
      this.setState({ mealIsShown: false });
    }
  };

  render() {
    return (
      <React.Fragment>
        <h2>{this.props.dayOfWeek}</h2>
        <div>
          <Button
            basic
            style={{ padding: "7px 10px" }}
            attached="left"
            onClick={this.showMealRecipe}
          >
            Meal
          </Button>
          <Button
            basic
            style={{ padding: "7px 10px" }}
            attached="right"
            onClick={this.showSideRecipe}
          >
            Side
          </Button>
        </div>
        {this.state.mealIsShown ? (
          <MealRecipe meal={this.props.meal} />
        ) : (
          <SideRecipe side={this.props.side} />
        )}
      </React.Fragment>
    );
  }
}

export { DailyRecipe };
