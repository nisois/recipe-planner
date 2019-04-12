import React from "react";
import { connect } from "react-redux";
import {
  SIGN_IN_EMAIL_CHANGED,
  SIGN_IN_PASSWORD_CHANGED
} from "../Constants/ActionTypes";
import { Form, Container } from "semantic-ui-react";
import * as firebase from "firebase";
import { Link } from "react-router-dom";

const SignInScreen = ({
  onEmailChanged,
  onPasswordChanged,
  email,
  password,
  error,
  canRequestSignIn
}) => {
  const handleEmailChange = event => onEmailChanged(event.target.value);
  const handlePasswordChange = event => onPasswordChanged(event.target.value);
  const handleFormSubmit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorMessage = error.message;
        if (error) {
          alert(errorMessage);
        } else {
          window.location.href = "/recipe-planner";
        }
        // ...
      });
  };

  return (
    <Container>
      <Form size="large">
        <Form.Input
          label="Email"
          value={email}
          onChange={handleEmailChange}
          type="email"
          autoCapitalize="none"
        />

        <Form.Input
          label="Password"
          value={password}
          type="password"
          onChange={handlePasswordChange}
        />
      </Form>

      <Form.Button onClick={handleFormSubmit} disabled={!canRequestSignIn}>
        Sign In
      </Form.Button>

      {!error ? <React.Fragment /> : <div>{error}</div>}

      <Link to="/signup">I don't have an account</Link>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    error: state.authentication.signIn.error,
    email: state.authentication.signIn.email,
    password: state.authentication.signIn.password,
    canRequestSignIn:
      state.authentication.signIn.email.trim().length > 0 &&
      state.authentication.signIn.password.trim().length > 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEmailChanged: email =>
      dispatch({
        type: SIGN_IN_EMAIL_CHANGED,
        payload: { email }
      }),
    onPasswordChanged: password =>
      dispatch({
        type: SIGN_IN_PASSWORD_CHANGED,
        payload: { password }
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen);
