import React, { Component } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import chemicalDetail, {
  chemicalIds,
} from "../../../../constants/chemicalDetail";
import ChemicalCard from "./molecules/chemicalCard";
import Loader from "../../../../molecules/loader.js";
import getCurrentCount from "./helpers/chemicalSection.getCurrentCount";
import updateDatabase from "./helpers/chemicalSection.updateDatabase";
import getItemName from "../../../../helpers/getItemName";
class ChemicalSection extends Component {
  state = {
    isLoading: true,
    chemicalActionType: "",
    actionChemicalId: "",
    editCount: "",
    editFormError: "",
  };

  componentDidMount() {
    const db = getDatabase();
    get(child(ref(db), "chemicalsCurrentCount"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          chemicalIds.forEach((chemical) => {
            this.setState({ [chemical]: data[chemical] || 0 });
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

  onCardAction(chemicalActionType, actionChemicalId) {
    if (chemicalActionType === "report") {
      window.location.href = `/chemicalReport?chemicalId=${actionChemicalId}`;
    } else {
      this.setState({ chemicalActionType, actionChemicalId });
    }
  }

  renderChemicalCards() {
    return (
      <div className="dashboardCardSection">
        {chemicalDetail.map((chemical) => (
          <ChemicalCard
            data={chemical}
            count={this.state[chemical.id]}
            key={chemical.id}
            onAction={this.onCardAction.bind(this)}
          />
        ))}
      </div>
    );
  }

  closeForm() {
    this.setState({
      chemicalActionType: "",
      actionChemicalId: "",
    });
  }

  submitEditChemicalForm(event) {
    event.preventDefault();

    getCurrentCount(this.state.actionChemicalId).then((currentCount) => {
      if (
        this.state.chemicalActionType === "remove" &&
        Number(currentCount) < Number(this.state.editCount)
      ) {
        this.setState({
          editFormError: `Enter number less than ${Number(currentCount) + 1}`,
        });
      } else {
        var updatedCurrentCount = Number(currentCount);
        if (this.state.chemicalActionType === "remove") {
          updatedCurrentCount -= Number(this.state.editCount);
        } else {
          updatedCurrentCount += Number(this.state.editCount);
        }

        updateDatabase(
          this.state.actionChemicalId,
          this.state.chemicalActionType,
          updatedCurrentCount,
          this.state.editCount
        );
        getCurrentCount(this.state.actionChemicalId).then((currentCount) => {
          this.setState({
            [this.state.actionChemicalId]: currentCount,
            chemicalActionType: "",
            actionChemicalId: "",
            editFormError: "",
          });
        });
      }
    });
  }

  handleEditQtyChange(event) {
    this.setState({ editCount: event.target.value, editFormError: "" });
  }

  renderChemicalForm() {
    return (
      <div className="overlayScreen">
        <form
          className="dashboardEditForm"
          onSubmit={(event) => this.submitEditChemicalForm(event)}
        >
          <div className="formHeader">
            <label className="formHeaderLabel ">Chemicals</label>
            <input
              type="button"
              className="formCloseBtn"
              onClick={() => this.closeForm()}
              value="X"
            />
          </div>
          <div className="actionHeader">
            <label>
              {this.state.chemicalActionType.substr(0, 1).toUpperCase() +
                this.state.chemicalActionType.substr(1) +
                " " +
                getItemName(chemicalDetail, this.state.actionChemicalId)}
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
              value={this.state.chemicalActionType.toUpperCase()}
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
        <h2 className="sectionHeading">Chemicals</h2>
        {this.state.isLoading ? <Loader /> : this.renderChemicalCards()}
        {this.state.actionChemicalId ? this.renderChemicalForm() : null}
        <hr />
      </div>
    );
  }
}

export default ChemicalSection;
