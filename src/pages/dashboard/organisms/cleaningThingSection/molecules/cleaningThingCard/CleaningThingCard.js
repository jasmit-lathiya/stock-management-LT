import { Component } from "react";
import { FaPlus, FaMinus, FaList } from "react-icons/fa";

class CleaningThingCard extends Component {
  render() {
    const { onAction, count, data } = this.props;
    const cardCountClassname =
      "dashboardCardCount " +
      (Number(count) <= Number(data.alertCount)
        ? "dashboardCardAlertCount"
        : "");
    return (
      <div className="dashboardCardContainer">
        <div className="dashboardCardNameAndCountContainer">
          <span className="dashboardCardName">{data.name}</span>
          <span className={cardCountClassname}>{count}</span>
        </div>
        <div className="dashboardCardActionButtonContainer">
          <FaPlus
            className="dashboardCardActionButton"
            onClick={() => {
              onAction("add", data.id);
            }}
          />
          <FaMinus
            className="dashboardCardActionButton"
            onClick={() => {
              onAction("remove", data.id);
            }}
          />
          <FaList
            className="dashboardCardActionButton"
            onClick={() => {
              onAction("report", data.id);
            }}
          />
        </div>
      </div>
    );
  }
}

export default CleaningThingCard;
