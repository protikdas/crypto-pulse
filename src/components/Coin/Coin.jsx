import React, { Component } from "react";
import "./Coin.less";

export default class Coin extends Component {
  render() {
    const {
      viewWidth,
      acronym,
      avatar,
      name,
      previousPrice,
      price,
      holding,
      index,
      deleteCoin,
      openHoldingModal
    } = this.props;

    let priceChange = "";

    if (previousPrice) {
      if (previousPrice < price) {
        priceChange = "increase";
      } else if (previousPrice > price) {
        priceChange = "decrease";
      }
    }

    return (
      <div className="coin-container">
        <div className="coin">
          <img className="coin-avatar" src={avatar} alt="" />
          <div className="coin-identity">
            <h2 className="coin-acronym">{acronym}</h2>
            {viewWidth > 600 && <p className="coin-name">{name}</p>}
          </div>
        </div>
        <div
          className="holding-container"
          onClick={() => {
            openHoldingModal(index);
          }}
        >
          <p className="holding-text">HOLDING</p>
          <h2 className="coin-price">{holding}</h2>
        </div>
        <div className={`price-container ${priceChange}`}>
          {viewWidth < 600 && <p className="holding-text">USD</p>}
          {price && (
            <h2 className="coin-price">
              {viewWidth >= 600 ? `$${price}` : price}
            </h2>
          )}
        </div>
        <div
          className="round-icon-wrapper"
          onClick={() => {
            deleteCoin(index);
          }}
        >
          <div className="round-icon-symbol">-</div>
        </div>
      </div>
    );
  }
}
