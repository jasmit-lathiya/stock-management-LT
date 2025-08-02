import React, { Component } from "react";

// import { getDatabase, ref, set, child, get } from "firebase/database";
// import { getAuth } from "firebase/auth";

// Components
import ChemicalSection from "./organisms/chemicalSection";
import CleaningThingSection from "./organisms/cleaningThingSection";

// Helpers
import validateLogin from "../../helpers/validateLogin";

// Style
import "./dashboard.css";
import DashboardHeader from "./organisms/dashboardHeader";

class Dashboard extends Component {
  componentDidMount() {
    validateLogin();
  }
  render() {
    return (
      <div className="dashboardPageContainer">
        <DashboardHeader />
        <ChemicalSection />
        <CleaningThingSection />
      </div>
    );
  }
}

export default Dashboard;
