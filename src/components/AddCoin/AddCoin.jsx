import React, { Component } from 'react';
import "./AddCoin.less";

export default class AddCoin extends Component {
  render() {
    return (
      <div className="add-coin-container">
        <div className="round-icon-wrapper">
          <div className="round-icon-symbol">+</div>
        </div>
        <h3>Add Coin</h3>
      </div>
    )
  }
}

