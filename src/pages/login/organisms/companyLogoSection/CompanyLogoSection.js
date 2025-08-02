import React, { Component } from "react";

// Assets
import companyLogoImg from "../../../../assets/companyLogoImg.png";

// Style
import "./companyLogoSection.css";

class CompanyLogoSection extends Component {
  render() {
    return (
      <div className="companyLogoContainer">
        <img src={companyLogoImg} alt="Company Logo" className="companyLogo" />
      </div>
    );
  }
}

export default CompanyLogoSection;
