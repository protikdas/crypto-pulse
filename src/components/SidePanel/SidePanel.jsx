import React, { Component } from "react";
import "./SidePanel.less";
import Chart from "../Chart/Chart";

export default class SidePanel extends Component {
  render() {
    const { coinsData, chartCoins } = this.props;
    const colors = ["#EC963F", "#37DB67"];

    let chartsJSX = chartCoins.map((coinIndex, i) => {
      return (
        <Chart
          key={i}
          lineStroke={colors[i]}
          chartData={coinsData[coinIndex]}
        />
      );
    });

    return <div className="side-panel-container">{chartsJSX}</div>;
  }
}
