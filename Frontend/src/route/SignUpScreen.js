import React from "react";
import { connect } from "react-redux";
import {
  SIGN_UP_EMAIL_CHANGED,
  SIGN_UP_PASSWORD_CHANGED,
  SIGN_UP_PASSWORD_CONFIRM_CHANGED
} from "../Constants/ActionTypes";
import { Form, Container } from "semantic-ui-react";
import * as firebase from "firebase";
import { Link } from "react-router-dom";

const SignUpScreen = ({
  onEmailChanged,
  onPasswordChanged,
  onPasswordConfirmChanged,
  email,
  password,
  confirmPassword,
  error,
  canRequestSignUp
}) => {
  const handleEmailChange = event => onEmailChanged(event.target.value);
  const handlePasswordChange = event => onPasswordChanged(event.target.value);
  const handlePasswordConfirm = event =>
    onPasswordConfirmChanged(event.target.value);
  const handleFormSubmit = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
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
          autoCapitalize="none"
        />

        <Form.Input
          label="Password"
          value={password}
          type="password"
          onChange={handlePasswordChange}
        />

        <Form.Input
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={handlePasswordConfirm}
        />
      </Form>

      <Form.Button onClick={handleFormSubmit} disabled={!canRequestSignUp}>
        Sign Up
      </Form.Button>

      {!error ? <React.Fragment /> : <div>{error}</div>}

      <Link to="/">I already have an account</Link>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    error: state.authentication.signUp.error,
    email: state.authentication.signUp.email,
    password: state.authentication.signUp.password,
    confirmPassword: state.authentication.signUp.confirmPassword,
    canRequestSignUp:
      state.authentication.signUp.email.trim().length > 0 &&
      state.authentication.signUp.password.trim().length > 0 &&
      state.authentication.signUp.password ===
        state.authentication.signUp.confirmPassword
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEmailChanged: email =>
      dispatch({
        type: SIGN_UP_EMAIL_CHANGED,
        payload: { email }
      }),
    onPasswordChanged: password =>
      dispatch({
        type: SIGN_UP_PASSWORD_CHANGED,
        payload: { password }
      }),
    onPasswordConfirmChanged: confirmPassword =>
      dispatch({
        type: SIGN_UP_PASSWORD_CONFIRM_CHANGED,
        payload: { confirmPassword }
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpScreen);
