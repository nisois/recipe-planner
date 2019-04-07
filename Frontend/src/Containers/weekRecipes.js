import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { GET_MEALS, GET_SIDES } from "../Constants/ActionTypes";
import { DailyRecipe } from "./oneDayRecipe";

class WeekRecipes extends Component {
  async componentDidMount() {
    const mealResults = await axios.get("http://localhost:4000/getMeals");
    const sideResults = await axios.get("http://localhost:4000/getSides");
    this.props.onGetMeals(mealResults.data);
    this.props.onGetSides(sideResults.data);
  }

  render() {
    let dayOfWeekArr = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
    let formatedRecipes = this.props.meals.map((meal, index) => (
      <DailyRecipe
        key={index}
        meal={meal}
        side={this.props.sides[index]}
        dayOfWeek={dayOfWeekArr[index]}
      />
    ));
    return <React.Fragment>{formatedRecipes}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return { meals: state.getRecipe.meals, sides: state.getRecipe.sides };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetMeals: meals =>
      dispatch({
        type: GET_MEALS,
        payload: meals
      }),
    onGetSides: sides => dispatch({ type: GET_SIDES, payload: sides })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeekRecipes);
