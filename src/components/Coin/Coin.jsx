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

    //Format Price and Total for better viewing
    let priceChange = "";
    let priceShow = 0;

    if (previousPrice) {
      if (previousPrice < price) {
        priceChange = "increase";
      } else if (previousPrice > price) {
        priceChange = "decrease";
      }
    }

    let total = 0;

    if (!isNaN(holding) && !isNaN(price)) {
      total = holding * price;
    }

    if (price) {
      priceShow = " $" + price;
      if (viewWidth < 600) {
        priceShow = "~$" + price.toFixed(0);
      }
    }

    if (price === undefined) {
      priceShow = "N/A";
    }

    if (total) {
      if (total.toString().length > 10) {
        total = total.toFixed(0);
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
          <p className="at-text">{`@${priceShow}`}</p>
        </div>
        <div className={`price-container ${total ? priceChange : ""}`}>
          {viewWidth < 600 && <p className="holding-text">USD</p>}
          {price && (
            <h2 className="coin-total">
              {viewWidth >= 600 ? `$${total}` : total}
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
