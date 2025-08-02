import React, { Component } from "react";

// Firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { getDatabase, child, ref, get } from "firebase/database";

// Components
import Loader from "../../../../molecules/loader.js";

// Helpers
import errorCodeMsg from "./helpers/loginFormSection.errorCodeMsg";
import saveUserDetails from "./helpers/loginFormSection.saveUserDetails";

// Style
import "./loginFormSection.css";
import NewUserRegistration from "./molecules/newUserRegistration/NewUserRegistration.js";

class LoginFormSection extends Component {
  state = {
    emailId: "",
    password: "",
    isLoading: false,
    error: "",
    showSignupPinField: false,
  };

  componentDidMount() {
    const db = getDatabase();
    get(child(ref(db), "signUpPin")).then((snapshot) => {
      this.setState({ signUpPin: snapshot.val() });
    });
  }

  handleEmailIdChange(event) {
    this.setState({ emailId: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const auth = getAuth();

    this.setState({ isLoading: true, error: "" });
    signInWithEmailAndPassword(auth, this.state.emailId, this.state.password)
      .then((response) => {
        saveUserDetails(response);
        window.location.replace("/dashboard");
      })
      .catch((error) => {
        this.setState({ error: errorCodeMsg(error), isLoading: false });
      });
  }

  renderForm() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <h3>Enter Your Details To Login :</h3>
        <div className="loginFormFieldContainer">
          <input
            type="email"
            name="emailId"
            id="emailId"
            placeholder="Email Id.."
            value={this.state.emailId}
            className="loginFormField"
            onChange={this.handleEmailIdChange.bind(this)}
          />
        </div>
        <div className="loginFormFieldContainer">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password.."
            className="loginFormField"
            required
            onChange={this.handlePasswordChange.bind(this)}
          />
        </div>
        <div className="loginFormFieldContainer">
          <input type="submit" value="Login" className="loginBtn" />
        </div>
        <p className="errorText">{this.state.error}</p>
      </form>
    );
  }

  handleSignUpBtnClick() {
    this.setState({ showSignupPinField: true });
  }

  handlePinChange(event) {
    if (event.target.value === this.state.signUpPin) {
      this.setState({ showNewUserForm: true });
    }
  }

  renderSignUpBtn() {
    return this.state.showSignupPinField ? (
      <input
        type="password"
        onChange={(event) => this.handlePinChange(event)}
      />
    ) : (
      <button className="signUpBtn" onClick={() => this.handleSignUpBtnClick()}>
        Sign Up
      </button>
    );
  }

  render() {
    return (
      <div className="loginFormSection">
        {this.state.isLoading ? <Loader /> : this.renderForm()}
        {this.renderSignUpBtn()}
        {this.state.showNewUserForm ? <NewUserRegistration /> : null}
      </div>
    );
  }
}

export default LoginFormSection;
