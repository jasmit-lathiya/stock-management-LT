import { Component } from "react";

// Assets
import companyLogoImg from "../../../../assets/companyLogoImg.png";
// import getUserName from "./helpers/dashboard.getUserName";
import { getDatabase, ref, child, get } from "firebase/database";
import "./dashboardHeader.css";

class DashboardHeader extends Component {
  state = {
    userName: "",
    isUserNameHover: false,
  };

  componentDidMount() {
    this.getUserName();
  }

  getUserName() {
    const db = getDatabase();

    const userId = localStorage.getItem("uid");
    get(child(ref(db), `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          this.setState({
            userName: userData.firstName + " " + userData.lastName,
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleLogout() {
    localStorage.clear();
    window.location.replace("/login");
  }

  handleMouseOver() {
    this.setState({
      isUserNameHover: true,
    });
  }

  handleMouseOut() {
    this.setState({
      isUserNameHover: false,
    });
  }

  render() {
    return (
      <div className="dashboardHeader">
        <img
          src={companyLogoImg}
          alt="Company Logo"
          className="dashboardCompanyLogo"
        />
        <div className="dashboardHeaderRightSectionContainer">
          <span
            className="dashboardUserName"
            // onMouseOver={() => this.handleMouseOver()}
            // onMouseOut={() => this.handleMouseOut()}
          >
            {`Hi, ${this.state.userName}`}
          </span>
          <button className="logoutBtn" onClick={this.handleLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default DashboardHeader;
