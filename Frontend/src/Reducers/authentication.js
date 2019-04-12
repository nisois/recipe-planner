import {
  SIGN_IN_FAILURE,
  SIGN_IN_EMAIL_CHANGED,
  SIGN_IN_PASSWORD_CHANGED,
  SIGN_UP_FAILURE,
  SIGN_UP_EMAIL_CHANGED,
  SIGN_UP_PASSWORD_CHANGED,
  SIGN_UP_PASSWORD_CONFIRM_CHANGED,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_EMAIL_CHANGED,
  GET_TOKEN,
  REMOVE_TOKEN
} from "../Constants/ActionTypes";

const initialState = {
  status: {
    clientToken: null
  },
  signIn: {
    error: null,
    success: null,
    email: "",
    password: ""
  },
  signUp: {
    error: null,
    success: null,
    email: "",
    password: "",
    confirmPassword: ""
  },
  forgotPassword: {
    error: null,
    success: null,
    email: ""
  }
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_FAILURE:
      return {
        ...state,
        signIn: { ...state.signIn, error: action.error }
      };
    case SIGN_IN_EMAIL_CHANGED:
      return {
        ...state,
        signIn: { ...state.signIn, email: action.payload.email }
      };
    case SIGN_IN_PASSWORD_CHANGED:
      return {
        ...state,
        signIn: { ...state.signIn, password: action.payload.password }
      };

    // Sign Up
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUp: { ...state.signUp, error: action.error }
      };
    case SIGN_UP_EMAIL_CHANGED:
      return {
        ...state,
        signUp: { ...state.signUp, email: action.payload.email }
      };
    case SIGN_UP_PASSWORD_CHANGED:
      return {
        ...state,
        signUp: { ...state.signUp, password: action.payload.password }
      };
    case SIGN_UP_PASSWORD_CONFIRM_CHANGED:
      return {
        ...state,
        signUp: {
          ...state.signUp,
          confirmPassword: action.payload.confirmPassword
        }
      };

    // Forgot Password
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...initialState,
        forgotPassword: {
          ...state.forgotPassword,
          success: "An email with a recovery link has been sent",
          error: initialState.forgotPassword.error
        }
      };
    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          error: action.error,
          success: initialState.forgotPassword.success
        }
      };
    case FORGOT_PASSWORD_EMAIL_CHANGED:
      return {
        ...state,
        forgotPassword: { ...state.forgotPassword, email: action.payload.email }
      };

    //Status
    case GET_TOKEN:
      return {
        ...state,
        status: { ...state.status, clientToken: action.payload }
      };
    case REMOVE_TOKEN:
      return {
        ...state,
        status: { ...state.status, clientToken: state.status.clientToken }
      };

    default:
      return state;
  }
}
