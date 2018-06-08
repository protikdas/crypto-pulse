import React, { Component } from "react";
import "./Wallet.less";

export default class Wallet extends Component {
  render() {
    return (
      <div className="wallet-positioner">
        <div className="wallet-container">
          <h2>Wallet</h2>
        </div>
        <div className="wallet-under" />
        <div className="wallet-under-2" />
      </div>
    );
  }
}
