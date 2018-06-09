import React, { Component } from "react";
import "./Coin.less";

//BITCOIN PNG
import btc from "../../assets/Bitcoin-icon.png";

export default class Coin extends Component {
  render() {
    const { viewWidth } = this.props;
    const avatar = btc;
    const acronym = "BTC";
    const name = "BitCoin";
    const price = "7000.124";
    const holding = "20.524";

    return (
      <div className="coin-container">
        <div className="coin">
          <img className="coin-avatar" src={avatar} alt="" />
          <div className="coin-identity">
            <h2 className="coin-acronym">{acronym}</h2>
            <p className="coin-name">{name}</p>
          </div>
        </div>
        <div className="holding-container">
          <p className="holding-text">HOLDING</p>
          <h2 className="coin-price">{holding}</h2>
        </div>
        <div className="price-container">
          {viewWidth < 600 && <p className="holding-text">USD</p>}
          <h2 className="coin-price">{viewWidth >= 600 ? `$${price}` : price}</h2>
        </div>
      </div>
    );
  }
}
