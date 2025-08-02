import { Component } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../../molecules/loader.js/index.js";
import getCleaningThingHistory from "./helpers/cleaningThingReport.getCleaningThingHistory";
import getCurrentCount from "../dashboard/organisms/cleaningThingSection/helpers/cleaningThingSection.getCurrentCount";
import getAllUserData from "../../helpers/getAllUserData.js";
import { FaHome } from "react-icons/fa";
import cleaningThingDetail from "../../constants/cleaningThingDetail";
import getItemName from "../../helpers/getItemName";

class CleaningThingReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cleaningThingId: new URLSearchParams(window.location.search).get(
        "cleaningThingId"
      ),
      currentCount: 0,
      isHistoryLoading: true,
      isCurrentCountLoading: true,
    };
  }

  componentDidMount() {
    getAllUserData().then((userData) => this.setState({ userData }));

    getCurrentCount(this.state.cleaningThingId).then((count) =>
      this.setState({ currentCount: count, isCurrentCountLoading: false })
    );

    getCleaningThingHistory(this.state.cleaningThingId).then((reportData) => {
      this.setState({ reportData, isHistoryLoading: false });
    });
  }

  getUserName(userId) {
    const userData = this.state.userData[userId];
    if (userData?.firstName) {
      return userData.firstName + " " + userData.lastName;
    }
    return userId;
  }

  renderReportRow(data, index) {
    const rowClassName =
      data.type === "add" ? "addTypeClass" : "removeTypeClass";
    return (
      <tr className="reportRowContainer">
        <td className={`reportSrNoColumn ${rowClassName}`}>{index + 1}</td>
        <td className={`reportDateColumn ${rowClassName}`}>{data.date}</td>
        <td className={`reportCountColumn ${rowClassName}`}>{data.count}</td>
        <td className={`reportUserColumn ${rowClassName}`}>
          {this.state.userData
            ? this.getUserName(data.updatedBy)
            : data.updatedBy}
        </td>
      </tr>
    );
  }
  renderReportData() {
    return (
      <table className="reportContainer">
        <tr className="reportRowContainer">
          <th className="reportColumnHeader">Sr. No.</th>
          <th className="reportColumnHeader">Date</th>
          <th className="reportColumnHeader">Count</th>
          <th className="reportColumnHeader">Updated By</th>
        </tr>
        {this.state.reportData.map((reportDataElement, index) =>
          this.renderReportRow(reportDataElement, index)
        )}
      </table>
    );
  }

  redirectToDashboard() {
    window.location.href = "/dashboard";
  }

  render() {
    if (!this.state.cleaningThingId) {
      return <Navigate to="/dashboard" />;
    }
    return (
      <div className="reportPageContainer">
        <div className="reportHeaderContainer">
          <FaHome
            className="reportHeaderHomeIcon"
            onClick={this.redirectToDashboard}
          />
          <span className="reportHeaderLabel">{`${getItemName(
            cleaningThingDetail,
            this.state.cleaningThingId
          )} Report `}</span>
          <span className="reportHeaderCurrentCount">
            {this.state.isCurrentCountLoading ? "" : this.state.currentCount}
          </span>
        </div>
        {this.state.isHistoryLoading ? <Loader /> : this.renderReportData()}
      </div>
    );
  }
}

export default CleaningThingReport;
