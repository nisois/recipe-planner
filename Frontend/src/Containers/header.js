import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Modal, Container } from "semantic-ui-react";
import { GET_MEALS, GET_SIDES, REMOVE_TOKEN } from "../Constants/ActionTypes";
import { AddRecipeContainer } from "./addRecipeContainer";
import axios from "axios";
import { removeAccessToken } from "../helpers/oauth-helper";
import * as firebase from "firebase";
import { Link } from "react-router-dom";

export const HeaderContainer = props => {
  const handleUpdateMenu = async () => {
    let mealIds = props.meals.map(meal => meal._id).join(",");
    let sideIds = props.sides.map(side => side._id).join(",");
    const mealResults = await axios.get(
      `http://localhost:4000/getMeals?mealIds=${mealIds}`
    );
    const sideResults = await axios.get(
      `http://localhost:4000/getSides?sideIds=${sideIds}`
    );
    props.onGetMeals(mealResults.data);
    props.onGetSides(sideResults.data);
    await axios.post("http://localhost:4000/updateUserRecipes", {
      meals: mealResults.data,
      sides: sideResults.data,
      userId: props.token
    });
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened.
      });
    removeAccessToken();
    props.onRemoveToken();
  };

  return (
    <Container>
      <Menu style={{ backgroundColor: "#FFE066" }}>
        <Menu.Menu position="left">
          <Menu.Item header>Meal Planner</Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
          <Modal trigger={<Menu.Item name="add recipe">Add Recipe</Menu.Item>}>
            {<AddRecipeContainer />}
          </Modal>
          <Menu.Item name="update" onClick={handleUpdateMenu}>
            Update Menu
          </Menu.Item>
          <Menu.Item name="logout" onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
  );
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
    onGetSides: sides => dispatch({ type: GET_SIDES, payload: sides }),
    onRemoveToken: () =>
      dispatch({
        type: REMOVE_TOKEN
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer);
