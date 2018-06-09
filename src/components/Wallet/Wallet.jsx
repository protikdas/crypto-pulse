import React, { Component } from "react";
import "./Wallet.less";

export default class Wallet extends Component {
  numberWithCommas = (x) => {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  render() {
    const {viewWidth} = this.props;
    const amount = 24123112.24;
    let whole = amount.toString().split(".")[0];
    whole = this.numberWithCommas(whole);
    const decimal = amount.toString().split(".")[1];



    return (
      <div className="wallet-positioner">
        <div className="wallet-container">
          <h2 className="wallet-header">Wallet</h2>
          <div className="wallet-amount-container maroon" style={whole.length > 12 && viewWidth < 600 ? {left: 0} : {}}>
            <h2 className="wallet-currency">US&nbsp;</h2>
            <h2>$</h2>
            <h1 className="wallet-whole" style={whole.length > 12 && viewWidth < 600 ? {fontSize: "28px", top: "-4px"} : {} }>{whole}</h1>
            <h2>.</h2>
            <h2 className="wallet-decimal">{decimal}</h2>
          </div>
        </div>
        <div className="wallet-under" />
        <div className="wallet-under-2" />
      </div>
    );
  }
}