import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { GET_RECIPE } from "../Constants/ActionTypes";
import { DailyRecipe } from "./oneDayRecipe";
import { Container } from "semantic-ui-react";

class WeekRecipes extends Component {
  async componentDidMount() {
    const results = await axios.get("http://localhost:4000/allRecipes");
    this.props.onGetRecipes(results.data);
  }

  render() {
    let formatedRecipes = this.props.recipes.map((recipe, index) => (
      <DailyRecipe key={index} meal={recipe} side={recipe} dayOfWeek="Monday" />
    ));
    return (
      <Container style={{ marginTop: "50px" }}>{formatedRecipes}</Container>
    );
  }
}

const mapStateToProps = state => {
  return { recipes: state.getRecipe.recipes };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetRecipes: recipes =>
      dispatch({
        type: GET_RECIPE,
        payload: recipes
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeekRecipes);
