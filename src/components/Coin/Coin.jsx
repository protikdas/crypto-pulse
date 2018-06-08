import React, { Component } from "react";
import "./Coin.less";

//BITCOIN PNG
import btc from "../../assets/Bitcoin-icon.png";

export default class Coin extends Component {
  render() {
    const avatar = btc;
    const acronym = "BTC";
    const name = "BitCoin";

    return (
      <div className="coin-container">
        <div className="coin">
          <img className="coin-avatar" src={avatar} alt="" />
          <div className="coin-identity">
            <h2 className="coin-acronym">{acronym}</h2>
            <p className="coin-name">{name}</p>
          </div>
        </div>
      </div>
    );
  }
}
