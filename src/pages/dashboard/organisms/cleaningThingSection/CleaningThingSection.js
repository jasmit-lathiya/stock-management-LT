import React, { Component } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import cleaningThingDetail, {
  cleaningThingIds,
} from "../../../../constants/cleaningThingDetail";
import CleaningThingCard from "./molecules/cleaningThingCard";
import Loader from "../../../../molecules/loader.js";
import getCurrentCount from "./helpers/cleaningThingSection.getCurrentCount";
import updateDatabase from "../cleaningThingSection/helpers/cleaningThingSection.updateDatabase";
import getItemName from "../../../../helpers/getItemName";

class CleaningThingSection extends Component {
  state = {
    isLoading: true,
    cleaningThingActionType: "",
    actionCleaningThingId: "",
    editCount: "",
    editFormError: "",
  };

  componentDidMount() {
    const db = getDatabase();
    get(child(ref(db), "cleaningThingsCurrentCount"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          cleaningThingIds.forEach((cleaningThing) => {
            this.setState({ [cleaningThing]: data[cleaningThing] });
          });
        } else {
          console.log("No data available");
        }
      })
      .catch(() => {
        console.log("Some Error");
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  onCardAction(cleaningThingActionType, actionCleaningThingId) {
    if (cleaningThingActionType === "report") {
      window.location.href = `/cleaningThingReport?cleaningThingId=${actionCleaningThingId}`;
    } else {
      this.setState({ cleaningThingActionType, actionCleaningThingId });
    }
  }

  renderCleaningThingCards() {
    return (
      <div className="dashboardCardSection">
        {cleaningThingDetail.map((cleaningThing) => (
          <CleaningThingCard
            data={cleaningThing}
            count={this.state[cleaningThing.id]}
            key={cleaningThing.id}
            onAction={this.onCardAction.bind(this)}
          />
        ))}
      </div>
    );
  }

  closeForm() {
    this.setState({
      cleaningThingActionType: "",
      actionCleaningThingId: "",
    });
  }

  submitEditCleaningThingForm(event) {
    event.preventDefault();

    getCurrentCount(this.state.actionCleaningThingId).then((currentCount) => {
      if (
        this.state.cleaningThingActionType === "remove" &&
        Number(currentCount) < Number(this.state.editCount)
      ) {
        this.setState({
          editFormError: `Enter number less than ${Number(currentCount) + 1}`,
        });
      } else {
        var updatedCurrentCount = Number(currentCount);
        if (this.state.cleaningThingActionType === "remove") {
          updatedCurrentCount -= Number(this.state.editCount);
        } else {
          updatedCurrentCount += Number(this.state.editCount);
        }

        updateDatabase(
          this.state.actionCleaningThingId,
          this.state.cleaningThingActionType,
          updatedCurrentCount,
          this.state.editCount
        );
        getCurrentCount(this.state.actionCleaningThingId).then(
          (currentCount) => {
            this.setState({
              [this.state.actionCleaningThingId]: currentCount,
              cleaningThingActionType: "",
              actionCleaningThingId: "",
              editFormError: "",
            });
          }
        );
      }
    });
  }

  handleEditQtyChange(event) {
    this.setState({ editCount: event.target.value, editFormError: "" });
  }

  renderCleaningThingForm() {
    return (
      <div className="overlayScreen">
        <form
          className="dashboardEditForm"
          onSubmit={(event) => this.submitEditCleaningThingForm(event)}
        >
          <div className="formHeader">
            <label className="formHeaderLabel">Cleaning Things</label>
            <input
              type="button"
              className="formCloseBtn"
              onClick={() => this.closeForm()}
              value="X"
            />
          </div>
          <div className="actionHeader">
            <label>
              {this.state.cleaningThingActionType.substr(0, 1).toUpperCase() +
                this.state.cleaningThingActionType.substr(1) +
                " " +
                getItemName(
                  cleaningThingDetail,
                  this.state.actionCleaningThingId
                )}
            </label>
          </div>
          <div className="qtyInputContainer">
            <div>
              <label>Qty : </label>
              <input
                type="number"
                min="1"
                max="999"
                className="qtyInput"
                onChange={this.handleEditQtyChange.bind(this)}
                autoFocus
              />
            </div>
            <input
              type="submit"
              className="submitBtn"
              value={this.state.cleaningThingActionType.toUpperCase()}
            />
          </div>
          <label className="errorText">{this.state.editFormError}</label>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2 className="sectionHeading">Cleaning Things</h2>
        {this.state.isLoading ? <Loader /> : this.renderCleaningThingCards()}
        {this.state.actionCleaningThingId
          ? this.renderCleaningThingForm()
          : null}
        <hr />
      </div>
    );
  }
}

export default CleaningThingSection;
