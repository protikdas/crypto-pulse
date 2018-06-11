import React, { Component } from "react";
import "./Wallet.less";
import walletUnderStyles from "./WalletStyles.json";

import walletArt from "../../assets/svg/wallet-art.svg";
import walletIcon from "../../assets/icons/wallet.svg";

export default class Wallet extends Component {
  numberWithCommas = x => {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  render() {
    const { viewWidth, amount, previousAmount } = this.props;
    let view = "desktop";
    if (viewWidth > 1024) {
      view = "desktop";
    } else {
      view = "mobile";
    }

    let amountChange = "none";

    if (amount > previousAmount) {
      amountChange = view + "AmountIncrease";
    } else if (amount < previousAmount) {
      amountChange = view + "AmountDecrease";
    }

    let whole = amount.toString().split(".")[0];
    whole = this.numberWithCommas(whole);
    let decimal = amount.toString().split(".")[1];
    if (!decimal) {
      decimal = "00";
    }

    return (
      <div className="wallet-positioner">
        <div className="wallet-container">
          <img className="wallet-art" src={walletArt} alt="" />
          <div className="wallet-header">
            <img className="wallet-icon" src={walletIcon} alt="" />
            <h2>Wallet</h2>
          </div>
          <div
            className="wallet-amount-container"
            style={whole.length > 12 && viewWidth < 600 ? { left: 0 } : {}}
          >
            <h2 className="wallet-currency">US&nbsp;</h2>
            <h2>$</h2>
            <h1
              className="wallet-whole"
              style={
                whole.length > 12 && viewWidth < 600
                  ? { fontSize: "28px", top: "-4px" }
                  : {}
              }
            >
              {whole}
            </h1>
            <h2>.</h2>
            <h2 className="wallet-decimal">{decimal}</h2>
          </div>
        </div>
        <div className="wallet-under" style={walletUnderStyles[amountChange]} />
        <div
          className="wallet-under-2"
          style={walletUnderStyles[amountChange + "2"]}
        />
      </div>
    );
  }
}
