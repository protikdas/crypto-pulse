import React, { Component } from "react";
import "./Wallet.less";

export default class Wallet extends Component {
  // calculateAmount = coinsData => {
  //   let amount = 0;
  //   for (let i = 0; i < coinsData.length; i++) {
  //     const coinData = coinsData[i];
  //     amount = amount + coinData.holding * coinData.price;
  //   }
  //   this.setState({
  //     amount
  //   });
  // };

  numberWithCommas = x => {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  render() {
    const { viewWidth, amount } = this.props;
    let whole = amount.toString().split(".")[0];
    whole = this.numberWithCommas(whole);
    let decimal = amount.toString().split(".")[1];
    if (!decimal) {
      decimal = "00";
    }

    return (
      <div className="wallet-positioner">
        <div className="wallet-container">
          <h2 className="wallet-header">Wallet</h2>
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
        <div className="wallet-under" />
        <div className="wallet-under-2" />
      </div>
    );
  }
}
