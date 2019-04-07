import React, { Component } from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import WeekRecipes from "./Containers/weekRecipes";
import { HeaderContainer } from "./Containers/header";

class App extends Component {
  render() {
    return (
      <Container>
        <HeaderContainer />
        <WeekRecipes />
      </Container>
    );
  }
}

export default App;
