import { Component } from "react";
import { getDatabase, ref, set } from "firebase/database";

import "./newUserRegistration.css";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

class NewUserRegistration extends Component {
  state = {
    firstName: "",
    lastame: "",
    email: "",
    password: "",
  };

  handleFieldChange(id, event) {
    this.setState({ [id]: event.target.value });
  }

  submitNewUserForm(event) {
    event.preventDefault();

    const auth = getAuth();
    const db = getDatabase();

    createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((response) => {
        return response.user.uid;
      })
      .then((uid) => {
        set(ref(db, `users/${uid}`), {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
        });

        window.location.reload();
      });

    // set(ref(db, `users/${this.state.userId}`), {
    //   firstName: this.state.firstName,
    //   lastName: this.state.lastName,
    //   email: this.state.email,
    // });
  }

  render() {
    return (
      <div>
        <form
          className="newUserRegFormContainer"
          onSubmit={(event) => this.submitNewUserForm(event)}
        >
          <div className="newUserFormHeader">
            <span className="newUserFormHeaderLabel">
              New User Registration
            </span>
          </div>
          <div className="newUserFormFieldContainer">
            <label className="newUserFormFieldLabel">First Name :</label>
            <input
              required
              onChange={(event) => this.handleFieldChange("firstName", event)}
            />
          </div>
          <div className="newUserFormFieldContainer">
            <label className="newUserFormFieldLabel">Last Name :</label>
            <input
              required
              onChange={(event) => this.handleFieldChange("lastName", event)}
            />
          </div>
          <div className="newUserFormFieldContainer">
            <label className="newUserFormFieldLabel">Email :</label>
            <input
              type="email"
              required
              onChange={(event) => this.handleFieldChange("email", event)}
            />
          </div>
          <div className="newUserFormFieldContainer">
            <label className="newUserFormFieldLabel">Password :</label>
            <input
              required
              onChange={(event) => this.handleFieldChange("password", event)}
            />
          </div>
          <div className="newUserFormFieldContainer">
            <input type="submit" value="Register User" className="regUserBtn" />
          </div>
        </form>
      </div>
    );
  }
}

export default NewUserRegistration;
