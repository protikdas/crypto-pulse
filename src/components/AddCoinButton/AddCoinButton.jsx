import React, { Component } from "react";
import "./AddCoinButton.less";

export default class AddCoinButton extends Component {
  render() {
    const { label, status } = this.props;
    return (
      <div className="add-coin-container">
        <div
          className={`round-icon-wrapper ${status}`}
          onClick={this.props.action}
        >
          <div className="round-icon-symbol">+</div>
        </div>
        {label && <h3>Add Coin</h3>}
      </div>
    );
  }
}
