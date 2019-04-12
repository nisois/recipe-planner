import React, { Component } from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import WeekRecipes from "./Containers/weekRecipes";
import HeaderContainer from "./Containers/header";
import * as firebase from "firebase";
import { FirebaseConfig } from "./config/keys";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken
} from "./helpers/oauth-helper";
import { BrowserRouter, Route, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { GET_TOKEN, REMOVE_TOKEN } from "./Constants/ActionTypes";
import SignUpScreen from "./route/SignUpScreen";
import SignInScreen from "./route/SignInScreen";

firebase.initializeApp(FirebaseConfig);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(FirebaseConfig);
    }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = async user => {
    if (user) {
      await setAccessToken(user.uid);
      this.props.onGetToken(user.uid);
    } else {
      await removeAccessToken();
      this.props.onRemoveToken();
    }
    this.setState({ isAuthenticationReady: true, isAuthenticated: !!user });
  };

  renderSigninScreen = () => {
    return <SignInScreen />;
  };

  renderSignupScreen = () => {
    return <SignUpScreen />;
  };

  renderMainPage = () => {
    return (
      <React.Fragment>
        <HeaderContainer />
        <WeekRecipes />
      </React.Fragment>
    );
  };

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={
            this.state.isAuthenticated
              ? this.renderMainPage
              : this.renderSigninScreen
          }
        />
        <Route exact path="/signup" render={this.renderSignupScreen} />
        <Route exact path="/recipe-planner" render={this.renderMainPage} />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return { token: state.authentication.status.clientToken };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetToken: token =>
      dispatch({
        type: GET_TOKEN,
        payload: token
      }),
    onRemoveToken: () =>
      dispatch({
        type: REMOVE_TOKEN
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
