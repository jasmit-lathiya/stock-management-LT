import React, { Component } from "react";

// Components
import CompanyLogoSection from "./organisms/companyLogoSection";
import LoginFormSection from "./organisms/loginFormSection";

// Style
import "./login.css";

class Login extends Component {
  render() {
    return (
      <div className="loginScreen">
        <CompanyLogoSection />
        <LoginFormSection />
      </div>
    );
  }
}

export default Login;
