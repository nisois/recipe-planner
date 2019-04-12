import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { GET_MEALS, GET_SIDES } from "../Constants/ActionTypes";
import { DailyRecipe } from "./oneDayRecipe";
import { Container } from "semantic-ui-react";

class WeekRecipes extends Component {
  async componentDidMount() {
    const user = await axios.get(
      `http://localhost:4000/getUser?userId=${this.props.token}`
    );
    console.log(user.data);
    if (user) {
      this.props.onGetMeals(user.data.userRecipes.meals);
      this.props.onGetSides(user.data.userRecipes.sides);
    } else {
      const mealResults = await axios.get("http://localhost:4000/getMeals");
      const sideResults = await axios.get("http://localhost:4000/getSides");
      this.props.onGetMeals(mealResults.data);
      this.props.onGetSides(sideResults.data);
      await axios.post("http://localhost:4000/updateUserRecipes", {
        meals: this.props.meals,
        sides: this.props.sides,
        userId: this.props.token
      });
    }
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
    if (this.props.meals.length < 7 && this.props.sides.length < 7) {
      return (
        <Container style={style.container}>
          <h2 style={style.h2}>
            You need at least 7 meals and 7 sides to generate your menu.
          </h2>
        </Container>
      );
    } else {
      return <Container style={style.container}>{formatedRecipes}</Container>;
    }
  }
}

const style = {
  container: {
    paddingTop: "100px"
  },
  h2: {
    textAlign: "center"
  }
};

const mapStateToProps = state => {
  return {
    meals: state.getRecipe.meals,
    sides: state.getRecipe.sides,
    token: state.authentication.status.clientToken
  };
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
